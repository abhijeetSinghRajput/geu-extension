import { useStudentStore } from "@/stores/useStudentStore";
import { motion } from "framer-motion";

const AcademicTab = ({ tabContentVariants, textVariants }) => {
  const { student } = useStudentStore();

  return (
    <motion.div
      key="academic"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-[32px]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px]">
        <motion.div
          className="space-y-6"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.div className="text-[14px]" variants={textVariants}>
            <h3 className="text-[14px] font-semibold text-muted-foreground uppercase mb-4">
              Enrollment Details
            </h3>
            <dl className="space-y-4">
              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-[160px] flex-shrink-0 font-medium text-muted-foreground">
                  Enrollment No
                </dt>
                <dd className="font-mono">{student.EnrollmentNo}</dd>
              </motion.div>
              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-[160px] flex-shrink-0 font-medium text-muted-foreground">
                  University Roll No
                </dt>
                <dd className="font-mono">{student.PRollNo}</dd>
              </motion.div>

              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-[160px] flex-shrink-0 font-medium text-muted-foreground">
                  Registration Id
                </dt>
                <dd className="font-mono">{student.RegID}</dd>
              </motion.div>
            </dl>
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          <motion.div variants={textVariants}>
            <h3 className="p-0 m-0 mb-[16px] text-[14px] font-semibold text-muted-foreground uppercase">
              Contact Information
            </h3>
            <dl className="space-y-4">
              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                  Personal Email
                </dt>
                <dd className="text-[14px]">
                  <a
                    href={`mailto:${student.Email}`}
                    className="text-primary hover:underline"
                  >
                    {student.Email?.toLowerCase()}
                  </a>
                </dd>
              </motion.div>
              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                  University Email
                </dt>
                <dd className="text-[14px]">
                  <a
                    href={`mailto:${student.OfficialMailID}`}
                    className="text-primary hover:underline"
                  >
                    {student.OfficialMailID?.toLowerCase()}
                  </a>
                </dd>
              </motion.div>
            </dl>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};



export default AcademicTab;
