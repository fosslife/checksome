import { useState } from "react";
import { Stack } from "@mantine/core";
import { Output } from "./Output";
import { UploadSection } from "./UploadSection";
import { invoke } from "@tauri-apps/api";

export type FileInfo = {
  hash: string;
  time: number;
};

export const Layout = () => {
  const [files, setFiles] = useState<Record<string, FileInfo>>({});
  const [loading, setLoading] = useState(false);

  const handleSetFiles = async (files: string[]) => {
    setLoading(true);
    let hashes: Record<string, FileInfo> = await invoke("calc_md5", {
      filenames: files,
    });
    setLoading(false);
    setFiles({ ...hashes });
  };
  return (
    <Stack
      h={"100%"}
      sx={{
        overflow: "hidden",
      }}
    >
      <UploadSection handleSetFiles={handleSetFiles}></UploadSection>
      <Output files={files} loading={loading}></Output>
    </Stack>
  );
};
