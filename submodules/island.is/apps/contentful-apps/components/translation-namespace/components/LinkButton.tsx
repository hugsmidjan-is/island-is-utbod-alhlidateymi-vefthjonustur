import React, { FC, KeyboardEvent } from 'react'
import isUrl from 'is-url'
import { Editor, Element as SlateElement, Range, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import { DialogsAPI } from '@contentful/app-sdk'

import { Button } from './Button'

interface LinkButtonProps {
  dialogs: DialogsAPI
}

const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })

  return !!link
}

const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
}

const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

export const withLinks = (editor: Editor) => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data: DataTransfer) => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

export const LinkButton: FC<React.PropsWithChildren<LinkButtonProps>> = ({
  dialogs,
}) => {
  const editor = useSlate()

  return (
    <Button
      icon="insert_link"
      active={isLinkActive(editor)}
      onMouseDown={async (event: KeyboardEvent<HTMLButtonElement>) => {
        event.preventDefault()

        const url = await dialogs.openPrompt({
          title: 'Enter an URL',
          message: 'Define the URL the text should link to.',
        })

        if (!url || typeof url !== 'string') {
          return
        }

        insertLink(editor, url)
      }}
    />
  )
}
