import { Group, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconX, IconPhoto } from "@tabler/icons-react";

type UploadDragProps = {
  handleSetFiles: (files: string[]) => void;
};

export const UploadDrag = ({ handleSetFiles }: UploadDragProps) => {
  return (
    <Dropzone
      onDragEnter={(e) => {
        e.preventDefault();
        return false;
      }}
      onDrop={(files) => console.log("accepted files", files)}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      multiple
      activateOnClick={false}
      useFsAccessApi={true}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: "50vh", pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload size="3.2rem" stroke={1.5} color={"gray"} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size="3.2rem" stroke={1.5} color={"gray"} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>
        <div>
          <Text size="xl" inline>
            Drag images here
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};
