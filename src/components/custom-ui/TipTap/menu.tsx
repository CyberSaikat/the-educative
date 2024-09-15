"use client";

import React from "react";
import { BubbleMenu, Editor, FloatingMenu } from "@tiptap/react";
import { MdFormatListBulleted, MdFormatListBulletedAdd } from "react-icons/md";
import { SlActionRedo, SlActionUndo } from "react-icons/sl";
import {
  FaBold,
  FaImage,
  FaItalic,
  FaLink,
  FaCode,
  FaQuoteLeft,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaTableCells,
} from "react-icons/fa6";
import {
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsTypeH4,
  BsTypeH5,
  BsTypeH6,
} from "react-icons/bs";
import { GoHorizontalRule, GoListOrdered } from "react-icons/go";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { IoTrash } from "react-icons/io5";

interface ToolbarButton {
  action: () => void;
  isActive: () => boolean;
  icon: React.ReactNode;
  label?: string;
  tooltipText: string;
}
export const MenuBar = ({
  editor,
  MenuType,
}: {
  editor: Editor | null;
  MenuType?: null | "FloatingMenu" | "BubbleMenu";
}) => {
  if (!editor) {
    return null;
  }
  const groups = [
    {
      label: "Undo/Redo",
      showFloatingMenu: true,
      showBubbleMenu: false,
      buttons: [
        {
          action: () => editor.chain().focus().undo().run(),
          isActive: () => editor.can().undo(),
          icon: <SlActionUndo />,
          tooltipText: "Undo",
        },
        {
          action: () => editor.chain().focus().redo().run(),
          isActive: () => editor.can().redo(),
          icon: <SlActionRedo />,
          tooltipText: "Redo",
        },
      ],
    },
    {
      label: "Text Formatting",
      showFloatingMenu: true,
      showBubbleMenu: true,
      buttons: [
        {
          action: () => editor.chain().focus().toggleBold().run(),
          isActive: () => editor.isActive("bold"),
          icon: <FaBold />,
          tooltipText: "Bold",
        },
        {
          action: () => editor.chain().focus().toggleItalic().run(),
          isActive: () => editor.isActive("italic"),
          icon: <FaItalic />,
          tooltipText: "Italic",
        },
        {
          action: () => editor.chain().focus().toggleBlockquote().run(),
          isActive: () => editor.isActive("blockquote"),
          icon: <FaQuoteLeft />,
          tooltipText: "Blockquote",
        },
      ],
    },
    {
      label: "Heading",
      showFloatingMenu: false,
      showBubbleMenu: false,
      buttons: [
        {
          action: () =>
            editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => editor.isActive("heading", { level: 1 }),
          icon: <BsTypeH1 />,
          tooltipText: "Heading 1",
        },
        {
          action: () =>
            editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => editor.isActive("heading", { level: 2 }),
          icon: <BsTypeH2 />,
          tooltipText: "Heading 2",
        },
        {
          action: () =>
            editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: () => editor.isActive("heading", { level: 3 }),
          icon: <BsTypeH3 />,
          tooltipText: "Heading 3",
        },
        {
          action: () =>
            editor.chain().focus().toggleHeading({ level: 4 }).run(),
          isActive: () => editor.isActive("heading", { level: 4 }),
          icon: <BsTypeH4 />,
          tooltipText: "Heading 4",
        },
        {
          action: () =>
            editor.chain().focus().toggleHeading({ level: 5 }).run(),
          isActive: () => editor.isActive("heading", { level: 5 }),
          icon: <BsTypeH5 />,
          tooltipText: "Heading 5",
        },
        {
          action: () =>
            editor.chain().focus().toggleHeading({ level: 6 }).run(),
          isActive: () => editor.isActive("heading", { level: 6 }),
          icon: <BsTypeH6 />,
          tooltipText: "Heading 6",
        },
      ],
    },
    {
      label: "List",
      showFloatingMenu: true,
      showBubbleMenu: true,
      buttons: [
        {
          action: () => editor.chain().focus().toggleBulletList().run(),
          isActive: () => editor.isActive("bulletList"),
          icon: <MdFormatListBulleted />,
          tooltipText: "Bullet List",
        },
        {
          action: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: () => editor.isActive("orderedList"),
          icon: <GoListOrdered />,
          tooltipText: "Ordered List",
        },
        {
          action: () => editor.chain().focus().sinkListItem("listItem").run(),
          isActive: () => editor.isActive("sinkListItem"),
          icon: <MdFormatListBulletedAdd />,
          tooltipText: "Increase List Indent",
        },
      ],
    },
    {
      label: "Alignment",
      showFloatingMenu: true,
      showBubbleMenu: false,
      buttons: [
        {
          action: () => editor.chain().focus().setTextAlign("left").run(),
          isActive: () => editor.isActive("textAlign", { align: "left" }),
          icon: <FaAlignLeft />,
          tooltipText: "Align Left",
        },
        {
          action: () => editor.chain().focus().setTextAlign("center").run(),
          isActive: () => editor.isActive("textAlign", { align: "center" }),
          icon: <FaAlignCenter />,
          tooltipText: "Align Center",
        },
        {
          action: () => editor.chain().focus().setTextAlign("right").run(),
          isActive: () => editor.isActive("textAlign", { align: "right" }),
          icon: <FaAlignRight />,
          tooltipText: "Align Right",
        },
        {
          action: () => editor.chain().focus().setTextAlign("justify").run(),
          isActive: () => editor.isActive("textAlign", { align: "justify" }),
          icon: <FaAlignJustify />,
          tooltipText: "Align Justify",
        },
      ],
    },
    {
      label: "Link and Media",
      showFloatingMenu: true,
      showBubbleMenu: true,
      buttons: [
        {
          action: () => {
            const url = window.prompt("Enter the URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          },
          isActive: () => editor.isActive("link"),
          icon: <FaLink />,
          tooltipText: "Add Link",
        },
        {
          action: () => {
            const url = window.prompt("Enter the image URL");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          },
          isActive: () => false,
          icon: <FaImage />,
          tooltipText: "Add Image",
        },
      ],
    },
    {
      label: "Code and Rule",
      showFloatingMenu: true,
      showBubbleMenu: false,
      buttons: [
        {
          action: () => editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => editor.isActive("codeBlock"),
          icon: <FaCode />,
          tooltipText: "Code Block",
        },
        {
          action: () => editor.chain().focus().setHorizontalRule().run(),
          isActive: () => false,
          icon: <GoHorizontalRule />,
          tooltipText: "Horizontal Rule",
        },
      ],
    },
    {
      label: "Table",
      showFloatingMenu: true,
      showBubbleMenu: false,
      buttons: [
        {
          action: () => {
            const inputs = [
              {
                name: "rows",
                label: "Number of Rows",
                type: "number",
                placeholder: "Enter rows",
              },
              {
                name: "cols",
                label: "Number of Columns",
                type: "number",
                placeholder: "Enter columns",
              },
            ];
          },
          isActive: () => editor.isActive("table"),
          icon: <FaTableCells />,
          tooltipText: "Insert Table",
        },
        {
          action: () => editor.chain().focus().deleteTable().run(),
          isActive: () => false,
          icon: <IoTrash />,
          tooltipText: "Delete Current Table",
        },
      ],
    },
  ];

  if (MenuType === "FloatingMenu") {
    return (
      <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="floating-menu flex w-full gap-1">
          {groups.map((group) => {
            if (group.showFloatingMenu)
              return group.buttons.map((button, buttonIndex) => (
                <div key={buttonIndex}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <>
                          <Button
                            data-tip={button.tooltipText}
                            onClick={button.action}
                            type="button"
                            className={`px-3 py-1 rounded transition-colors shadow border border-accent ${
                              button.isActive()
                                ? "text-white"
                                : "bg-white hover:bg-gray-200 text-accent"
                            }`}
                          >
                            {button.icon}
                          </Button>
                        </>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{button.tooltipText}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ));
          })}
        </div>
      </FloatingMenu>
    );
  }

  if (MenuType === "BubbleMenu") {
    return (
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="bubble-menu flex w-full gap-1">
          {groups.map((group) => {
            if (group.showBubbleMenu)
              return group.buttons.map((button, buttonIndex) => (
                <div key={buttonIndex}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          data-tip={button.tooltipText}
                          onClick={button.action}
                          type="button"
                          className={`px-3 py-1 rounded transition-colors border ${
                            button.isActive()
                              ? "text-white"
                              : "bg-white hover:bg-gray-200 text-accent"
                          }`}
                        >
                          {button.icon}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{button.tooltipText}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ));
          })}
        </div>
      </BubbleMenu>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 rounded-t-lg border border-b-0">
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-1">
          <div className="text-xs font-semibold text-gray-700 tracking-wide text-center">
            {group.label}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {group.buttons.map((button, buttonIndex) => (
              <div key={buttonIndex}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        data-tip={button.tooltipText}
                        onClick={button.action}
                        type="button"
                        className={`px-3 py-1 rounded transition-colors ${
                          button.isActive()
                            ? "text-white"
                            : "bg-white hover:bg-gray-200 text-accent"
                        }`}
                      >
                        {button.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{button.tooltipText}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
