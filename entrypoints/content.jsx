// content.jsx
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import imageCompression from "browser-image-compression";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Camera, ImageIcon, Loader2, Upload, X } from "lucide-react";
import { cn } from "../lib/utils";
import "../entrypoints/popup/style.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default defineContentScript({
  matches: ["*://*.student.geu.ac.in/*"],
  allFrames: true,
  main() {
    console.log("✅ CONTENT SCRIPT IS LOADING ON GEU!");
    waitForProfile();
  },
});

function waitForProfile() {
  const img = document.getElementById("ImgEmp");
  if (img) injectButton(img);
}

function injectButton(img) {
  if (document.getElementById("geu-extension-btn")) return;

  // wrapper for positioning
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.width = "max-content";
  wrapper.style.margin = "auto";
  img.parentElement.insertBefore(wrapper, img);
  wrapper.appendChild(img);

  // container for React component
  const container = document.createElement("div");
  container.id = "geu-extension-btn";
  container.style.position = "absolute";
  container.style.bottom = "4px";
  container.style.right = "4px";
  wrapper.appendChild(container);

  // React root
  const root = createRoot(container);
  root.render(<InjectedButton img={img} />);
}

// React component with dialog
function InjectedButton({ img }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [compressing, setCompressing] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [fileSize, setFileSize] = useState(null);
  const inputRef = useRef(null);

  const compressImage = async (imageFile) => {
    const options = {
      maxSizeMB: 0.04, // 40KB
      maxWidthOrHeight: 250,
      useWebWorker: true,
      fileType: "image/jpeg",
      initialQuality: 0.85,
    };

    try {
      setCompressing(true);
      let compressedFile = await imageCompression(imageFile, options);

      if (compressedFile.size > 40000) {
        const lowerQualityOptions = { ...options, initialQuality: 0.7 };
        compressedFile = await imageCompression(imageFile, lowerQualityOptions);
      }

      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    } finally {
      setCompressing(false);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(selectedFile.type)) {
      console.log("Only JPG, JPEG, PNG formats are supported.");
      return;
    }

    try {
      const compressedFile = await compressImage(selectedFile);
      setFile(compressedFile);
      setFileSize((compressedFile.size / 1024).toFixed(2)); // in KB
      setPreview(URL.createObjectURL(compressedFile));
    } catch (error) {
      console.log("Error processing image: " + error.message);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploadingAvatar(true);

    // Determine content type based on file
    const contentType = file.type || "image/jpeg"; // default to jpeg if missing

    // Append the file to FormData
    const formData = new FormData();
    formData.append("helpSectionImages", file, "avatar.jpg");

    try {
      const res = await axios.post(
        "https://student.geu.ac.in/Web_StudentAcademic/UploadStudentImg_ostulgn",
        formData,
        {
          withCredentials: true, // send ERP cookies
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        if (img) img.setAttribute("src", preview);
      } else {
        console.log("Upload failed!");
      }
    } catch (err) {
      console.error(err);
      console.log("Upload error: " + err.message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setFileSize(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className={cn("size-12 text-[16px]")}
        >
          <Camera style={{ width: "auto" }} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Profile Photo</DialogTitle>
        </DialogHeader>
        <Card className="border-none shadow-none">
          <CardContent className="flex flex-col items-center gap-4 p-4">
            <div className="relative">
              <Avatar className="size-32">
                <AvatarImage src={preview || img.src} />
                <AvatarFallback>
                  <img src="/avatar.svg" className="opacity-30" />
                </AvatarFallback>
              </Avatar>
              {preview && (
                <Button
                  onClick={handleRemove}
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -right-2 rounded-full size-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {fileSize && (
              <p className="text-sm text-muted-foreground">
                Compress to: <span className="font-medium">{fileSize} KB</span>
              </p>
            )}

            <input
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              ref={inputRef}
              className="hidden"
              onChange={handleFileChange}
              disabled={compressing}
            />

            <div className="flex gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => inputRef.current.click()}
                disabled={compressing || uploadingAvatar}
              >
                <ImageIcon style={{ width: "auto !important" }} /> Choose
              </Button>

              <Button
                onClick={handleUpload}
                disabled={!file || compressing || uploadingAvatar}
                className="flex items-center gap-2"
              >
                {uploadingAvatar ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload /> Upload
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
