import { Divider, Stack } from "@mantine/core";
import { MD5, lib } from "crypto-js";
import { readBinaryFile } from "@tauri-apps/api/fs";

import { UploadButton } from "./UploadButton";
import { UploadDrag } from "./UploadDrag";

type UploadProps = {
  handleSetFiles: (files: string[]) => void;
};

export const UploadSection = ({ handleSetFiles }: UploadProps) => {
  return (
    <Stack justify={"space-between"} pl={15}>
      <UploadDrag handleSetFiles={handleSetFiles}></UploadDrag>
      <Divider />
      <UploadButton handleSetFiles={handleSetFiles}></UploadButton>
    </Stack>
  );
};
