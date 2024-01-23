import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  useDisclosure,
  Image,
  Flex,
} from "@chakra-ui/react";
import { Skull } from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useFetchResurrection } from "../../queries";
import { useState } from "react";
import {
  WIKIPEDIA_RESSOURCE_URL,
  getRandomNumber,
  getWikipediaFilePath,
} from "../../utils";

export const RessurectionModal = ({ wikiId }: { wikiId?: string }) => {
  if (!wikiId) return null;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data } = useFetchResurrection(wikiId ?? "");
  const [isAnimation, setIsAnimation] = useState<boolean>(true);

  if (isOpen) {
    setTimeout(() => {
      if (isAnimation) setIsAnimation(false);
    }, 2500);
  }

  const json = data?.results?.bindings;
  if (!json) return null;

  const person = json[getRandomNumber(0, json.length)];

  console.log("person", person);
  const name = person?.reincarnName?.value ?? "N/A";
  const abstract = person?.abstractReincarn?.value ?? "";
  const thumbnail = person?.urlThumbnailReincarn?.value
    ? WIKIPEDIA_RESSOURCE_URL +
      getWikipediaFilePath(person.urlThumbnailReincarn.value)
    : "";

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
        }}
        colorScheme="red"
        size="sm"
        gap={1}
      >
        <Text textAlign="justify">Résurrection</Text>
        <Skull />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setIsAnimation(true);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          {isAnimation || isLoading ? (
            <Player
              autoplay
              loop
              src="https://lottie.host/504cfdd0-f99c-4944-8037-302062860654/106boAM1Qu.json"
              style={{ height: "300px", width: "300px" }}
            ></Player>
          ) : (
            <>
              <ModalHeader>{name}</ModalHeader>
              <ModalBody>
                {/* Flex col for mobile */}
                <Flex flexDirection={["column", "row"]} gap={4}>
                  <Image maxHeight={180} maxWidth={180} src={thumbnail}></Image>
                  <Text>{abstract}</Text>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="ghost"
                  mr={3}
                  onClick={() => {
                    onClose();
                    setIsAnimation(true);
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
