import { Box, Button, Flex } from "@mantine/core";
import { open, OpenDialogOptions } from "@tauri-apps/api/dialog";
import { MD5, lib } from "crypto-js";
import { readBinaryFile } from "@tauri-apps/api/fs";

type UploadButtonProps = {
  handleSetFiles: (files: string[]) => void;
};

export const UploadButton = ({ handleSetFiles }: UploadButtonProps) => {
  const handleOpenDialog = () => {
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
