import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
} from '@chakra-ui/react'
import { useState } from 'react'

const NotesEditor = ({
    data,
    setData,
    selectedContentIndex,
    selectedCategoryIndex,
    selectedQuestionIndex,
    isOpenNotes,
    onCloseNotes,
    openedBy,
}) => {
    const openedByQuestion = openedBy === 'question'
    const current = openedByQuestion
        ? data.data.content[selectedContentIndex].categoryList[
              selectedCategoryIndex
          ].questionList[selectedQuestionIndex]
        : data.data.content[selectedContentIndex]

    const notes = openedByQuestion
        ? current.userNotes.trim()
        : current.contentUserNotes.trim()
    const heading = openedByQuestion
        ? current.questionHeading
        : current.contentHeading
    const isEditMode = notes !== ''

    let [value, setValue] = useState(notes)

    let handleInputChange = e => {
        setValue(e.target.value)
    }

    function saveChanges() {
        openedByQuestion
            ? setData({
                  data: {
                      header: { ...data.data.header },
                      content: [
                          ...data.data.content.map(
                              (singleContent, contentIndex) =>
                                  contentIndex === selectedContentIndex
                                      ? {
                                            ...singleContent,
                                            categoryList:
                                                singleContent.categoryList.map(
                                                    (
                                                        singleCategory,
                                                        categoryIndex
                                                    ) =>
                                                        categoryIndex ===
                                                        selectedCategoryIndex
                                                            ? {
                                                                  ...singleCategory,
                                                                  questionList:
                                                                      singleCategory.questionList.map(
                                                                          (
                                                                              singleQuestion,
                                                                              questionIndex
                                                                          ) =>
                                                                              questionIndex ===
                                                                              selectedQuestionIndex
                                                                                  ? {
                                                                                        ...singleQuestion,
                                                                                        userNotes:
                                                                                            value,
                                                                                    }
                                                                                  : singleQuestion
                                                                      ),
                                                              }
                                                            : singleCategory
                                                ),
                                        }
                                      : singleContent
                          ),
                      ],
                      footer: { ...data.data.footer },
                  },
              })
            : setData({
                  data: {
                      header: { ...data.data.header },
                      content: [
                          ...data.data.content.map((singleContent, index) =>
                              index === selectedContentIndex
                                  ? {
                                        ...singleContent,
                                        contentUserNotes: value,
                                    }
                                  : singleContent
                          ),
                      ],
                      footer: { ...data.data.footer },
                  },
              })
    }

    return (
        <Modal
            closeOnOverlayClick={false}
            isOpen={isOpenNotes}
            onClose={onCloseNotes}
            size="md"
            isCentered
            motionPreset="slideInBottom"
        >
            <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px)" />
            <ModalContent>
                <ModalHeader>
                    {isEditMode ? 'Edit Keypoints' : 'Add Keypoints'}
                </ModalHeader>
                <ModalBody>
                    <Text>{heading}</Text>
                    <Textarea
                        value={value}
                        onChange={handleInputChange}
                        placeholder={isEditMode ? '' : 'Add your keypoints here...'}
                        size="sm"
                    />
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme={'green'}
                        variant={'solid'}
                        mr={3}
                        onClick={() => {
                            onCloseNotes()
                            saveChanges()
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        colorScheme={'green'}
                        variant={'outline'}
                        onClick={onCloseNotes}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default NotesEditor
