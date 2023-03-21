import { Stack, Table, LoadingOverlay } from "@mantine/core";

import { FileInfo } from "..";

type OutputProps = {
  files: Record<string, FileInfo>;
  loading: boolean;
};

export const Output = ({ files, loading }: OutputProps) => {
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
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(files).map((e) => (
            <tr key={e[1].hash}>
              <td>{e[0]}</td>
              <td>{e[1].hash}</td>
              <td>{e[1].time}ms</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};
