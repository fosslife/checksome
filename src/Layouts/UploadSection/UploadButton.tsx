import { Button, Flex } from "@mantine/core";
import { open } from "@tauri-apps/api/dialog";

type UploadButtonProps = {
  handleSetFiles: (files: string[]) => void;
};

export const UploadButton = ({ handleSetFiles }: UploadButtonProps) => {
  const handleOpenDialog = () => {
    // invoke("calc_md5", { filenames: ["a.c", "b.js"] });
    open({
      directory: false,
      multiple: true,
      title: "Select files to calculate hash",
    })
      .then((files) => {
        if (files && Array.isArray(files)) {
          handleSetFiles(files);
        }
      })
      .catch((e) => {
        console.error("ERROR PICKING FILES", e);
      });
  };
  return (
    <Flex justify={"center"} align="center" h={"35vh"}>
      <Button fullWidth onClick={handleOpenDialog}>
        Upload Files
      </Button>
    </Flex>
  );
};
