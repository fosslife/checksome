import { Box, Stack, Table, LoadingOverlay } from "@mantine/core";
import { lib, MD5 } from "crypto-js";
import { readBinaryFile } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";

type OutputProps = {
  files: string[];
};

export const Output = ({ files }: OutputProps) => {
  const [hashes, setHashes] = useState<{ filename: string; hash: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getHashes() {
      setLoading(true);
      let hashes = await Promise.all(calculateMd5(files));
      setLoading(false);

      setHashes([...hashes]);
    }
    getHashes();
  }, [files]);

  return (
    <Stack
      justify={"start"}
      h="100%"
      p={20}
      sx={{
        overflow: "auto",
      }}
    >
      <LoadingOverlay visible={loading} />
      <Table fontSize={"lg"}>
        <thead>
          <tr>
            <th>Filename</th>
            <th>Hash</th>
          </tr>
        </thead>
        <tbody>
          {hashes.map((e) => (
            <tr key={e.hash}>
              <td>{e.filename}</td>
              <td>{e.hash}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};

function byteArrayToWordArray(ba: any) {
  const wa: number[] = [];
  for (let i = 0; i < ba.length; i++) {
    wa[(i / 4) | 0] |= ba[i] << (24 - 8 * i);
  }

  return lib.WordArray.create(wa, ba.length);
}

const calculateMd5 = (files: string[]) => {
  if (!files.length) return [];
  return files.map(async (file) => {
    const content = await readBinaryFile(file);
    const wordArray = byteArrayToWordArray(content);
    const hash = MD5(wordArray);
    return { filename: file, hash: hash.toString() };
  });
};
