import { useStudentStore } from "@/stores/useStudentStore";
import { motion } from "framer-motion";
import { Phone, Cake, Home, WalletCards } from "lucide-react";

const PersonalTab = ({ tabContentVariants, textVariants }) => {
  const { student } = useStudentStore();
  return (
    <motion.div
      key="personal"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-[32px]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[32p]">
        <motion.div
          className="space-y-[24px]"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.div variants={textVariants}>
            <h3 className="p-0 m-0 mb-[16px] text-[14px] font-semibold text-muted-foreground uppercase">
              Personal Details
            </h3>
            <dl className="space-y-[16px]">
              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                  <div className="flex items-center gap-[8px]">
                    <Phone size={12} />
                    Mobile
                  </div>
                </dt>
                <dd className="text-[14px]">{student.MobileNO}</dd>
              </motion.div>

              {student.AlternateMobileNO && (
                <motion.div
                  className="flex items-start"
                  variants={textVariants}
                >
                  <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                    <div className="flex items-center gap-[8px]">
                      <Phone size={12} />
                      Alternate Mobile
                    </div>
                  </dt>
                  <dd className="text-[14px]">{student.AlternateMobileNO}</dd>
                </motion.div>
              )}

              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                  <div className="flex items-center gap-[8px]">
                    <Cake size={12} />
                    Date of Birth
                  </div>
                </dt>
                <dd className="text-[14px]">{student.DOB}</dd>
              </motion.div>

              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                  <div className="flex items-center gap-[8px]">
                    <WalletCards size={12} />
                    ABC Account
                  </div>
                </dt>
                <dd className="text-[14px]">{student.ABCAccountNo}</dd>
              </motion.div>

              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                  <div className="flex items-center gap-[8px]">
                    <Home size={12} />
                    Address
                  </div>
                </dt>
                <dd className="text-[14px]">{student.PAddress}</dd>
              </motion.div>
            </dl>
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-[24px]"
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
              Family Details
            </h3>
            <dl className="space-y-[16px]">
              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                  Father's Name
                </dt>
                <dd className="text-[14px]">{student.FatherHusName}</dd>
              </motion.div>

              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                  Father's Mobile
                </dt>
                <dd className="text-[14px]">{student.FMobileNo}</dd>
              </motion.div>

              <motion.div className="flex items-start" variants={textVariants}>
                <dt className="w-[160px] flex-shrink-0 text-[14px] font-medium text-muted-foreground">
                  Mother's Name
                </dt>
                <dd className="text-[14px]">{student.MotherName}</dd>
              </motion.div>
            </dl>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PersonalTab;
