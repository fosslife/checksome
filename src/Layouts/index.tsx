import { useState } from "react";
import { Button, Group } from "@mantine/core";
import { Output } from "./Output";
import { UploadSection } from "./UploadSection";

export const Layout = () => {
  const [files, setFiles] = useState<string[]>([]);
  const handleSetFiles = (files: string[]) => {
    setFiles([...files]);
  };
  return (
    <Group
      grow
      h={"100%"}
      sx={{
        overflow: "hidden",
      }}
    >
      <UploadSection handleSetFiles={handleSetFiles}></UploadSection>
      <Output files={files}></Output>
    </Group>
  );
};
