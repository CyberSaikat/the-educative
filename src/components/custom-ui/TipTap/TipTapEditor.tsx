"use client";

import React, { useState } from "react";
import { useEditor, EditorContent, Editor, FloatingMenu } from "@tiptap/react";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import Text from "@tiptap/extension-text";
import History from "@tiptap/extension-history";
import Bold from "@tiptap/extension-bold";
import TextAlign from "@tiptap/extension-text-align";
import Italic from "@tiptap/extension-italic";
import Strike from '@tiptap/extension-strike';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { MenuBar } from "./menu";
import FontFamily from "@tiptap/extension-font-family";
import OrderedList from "@tiptap/extension-ordered-list";
import { all, createLowlight } from "lowlight";
import "@/assets/scss/tiptap.scss";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const Tiptap = ({
  content,
  setContent,
  className,
  contentPreview = false,
  ...props
}: {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  contentPreview?: boolean;
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph.configure({
        HTMLAttributes: {
          class: "mb-4 tiptap_paragraph",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }).extend({
        renderHTML({ node, HTMLAttributes }) {
          const level = node.attrs.level as 1 | 2 | 3 | 4 | 5 | 6;
          const classMap: Record<typeof level, string> = {
            1: "text-3xl font-bold mb-4 tiptap_heading_1",
            2: "text-2xl font-semibold mb-3 tiptap_heading_2",
            3: "text-xl font-medium mb-2 tiptap_heading_3",
            4: "text-lg font-normal mb-1 tiptap_heading_4",
            5: "text-base font-normal mb-1 tiptap_heading_5",
            6: "text-sm font-normal mb-1 tiptap_heading_6",
          };

          return [
            `h${level}`,
            { ...HTMLAttributes, class: classMap[level] },
            0,
          ];
        },
      }),
      Text.configure({
        HTMLAttributes: {
          class: "tiptap_text",
        },
      }),
      TextStyle,
      FontFamily.configure({
        types: [
          'textStyle',
        ]
      }),
      Bold.configure({
        HTMLAttributes: {
          class: "font-bold tiptap_bold",
        },
      }),
      Italic.configure({
        HTMLAttributes: {
          class: "italic tiptap_italic",
        },
      }),
      Underline.configure({
        HTMLAttributes: {
          class: "underline tiptap_underline",
        },
      }),
      Strike.configure({
        HTMLAttributes: {
          class: "line-through tiptap_strike",
        },
      }),
      Subscript.configure({
        HTMLAttributes: {
          class: "sub tiptap_sub",
        },
      }),
      Superscript.configure({
        HTMLAttributes: {
          class: "super tiptap_super",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 pl-4 italic text-gray-700 tiptap_blockquote",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-4 tiptap_bullet_list",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "tiptap_list_item",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline tiptap_link",
        },
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: "tiptap_image",
        },
      }),
      CodeBlock.configure({
        languageClassPrefix: "language-",
        HTMLAttributes: {
          class: "tiptap_code_block",
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "tiptap_horizontal_rule",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-4 tiptap_ordered_list",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "tiptap_table border border-gray-300 rounded-lg mb-4",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "tiptap_table_row",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "tiptap_table_header",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "tiptap_table_cell",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[200px] p-4 border border-2 border-gray-300 rounded-b-md focus:border-blue-500",
      },
    },
    onCreate: ({ editor }) => {
      editor.commands.setContent(content ? content : "<p></p>");
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editable: true,
    immediatelyRender: false,
  });

  return (
    <>
      <div className={`tiptap-editor ${className}`}>
        <MenuBar editor={editor} />
        <div className="mb-6 border border-gray-300 rounded-b-lg overflow-hidden">
          {editor && (
            <>
              <MenuBar editor={editor} MenuType={"FloatingMenu"} />
              <MenuBar editor={editor} MenuType={"BubbleMenu"} />
            </>
          )}
          <EditorContent content={content} editor={editor} {...props} />
        </div>
        {contentPreview && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Content Preview:
            </h3>
            <div
              className="p-4 bg-gray-100 rounded-lg prose content-preview"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Tiptap;
