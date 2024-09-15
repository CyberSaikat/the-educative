"use client";

import { CustomUser } from "@/abstract/type";

type Pages = {
  [key: string]: {
    [key: string]: {
      [key: string]: boolean;
    };
  };
};

const pages: Pages = {
  users: {
    admin: {
      all: true,
    },
    user: {
      all: false,
    },
  },
  dashboard: {
    admin: {
      all: true,
    },
    user: {
      read: true,
      write: false,
    },
  },
  profile: {
    admin: {
      all: true,
    },
    user: {
      all: true,
    },
  },
};

pages.educative = pages.dashboard;

export function checkPermission(
  userdata: CustomUser,
  action = "read",
  requestPage?: string
) {
  if (typeof window === "undefined") return false;
  let pathname = window.location.pathname.split("/");
  let page = pathname[pathname.length - 1];
  const usertype = userdata.usertype ?? "user";
  const read = "read";

  if (!userdata) {
    return false;
  }

  if (
    userdata.usertype?.toLowerCase() === "admin" ||
    (requestPage &&
      pages[requestPage] &&
      pages[requestPage][usertype] &&
      (pages[requestPage][usertype].all ||
        pages[requestPage][usertype][action])) ||
    (pages[page] &&
      pages[page][usertype] &&
      (pages[page][usertype].all || pages[page][usertype][action]))
  ) {
    return true;
  } else {
    return false;
  }
}
