import { Group } from "@mantine/core";

import { UploadButton } from "./UploadButton";
import { UploadDrag } from "./UploadDrag";

type UploadProps = {
  handleSetFiles: (files: string[]) => void;
};

export const UploadSection = ({ handleSetFiles }: UploadProps) => {
  return (
    <Group grow noWrap p={10}>
      <UploadDrag handleSetFiles={handleSetFiles}></UploadDrag>

      <UploadButton handleSetFiles={handleSetFiles}></UploadButton>
    </Group>
  );
};
