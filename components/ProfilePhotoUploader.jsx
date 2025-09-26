import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Camera, ImageIcon, Loader2, Upload, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import imageCompression from "browser-image-compression";
import { Card, CardContent } from "./ui/card";
import axios from "axios";
import { useStudentStore } from "@/stores/useStudentStore";

const ProfilePhotoUploader = ({ img }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [compressing, setCompressing] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [fileSize, setFileSize] = useState(null);
  const inputRef = useRef(null);
  const { profile, getProfile, loading } = useStudentStore();
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  
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
        handleRemove();
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
          className={cn("size-[32px] rounded-xl text-[16px]")}
        >
          <Camera className="size-[24px]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-[18px] font-semibold text-primary p-0 m-0">
            Upload Profile Photo
          </DialogTitle>
        </DialogHeader>
        <Card className="border-none shadow-none">
          <CardContent className="flex flex-col items-center gap-4 p-4">
            <div className="relative">
              <Avatar className="size-48">
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
              <p className="text-[14px] text-muted-foreground">
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
                className="h-[38px] px-6 rounded-xl text-[14px] font-medium"
              >
                <ImageIcon /> Choose
              </Button>

              <Button
                onClick={handleUpload}
                disabled={!file || compressing || uploadingAvatar}
                className="h-[38px] px-6 rounded-xl text-[14px] font-medium"
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
};

export default ProfilePhotoUploader;
