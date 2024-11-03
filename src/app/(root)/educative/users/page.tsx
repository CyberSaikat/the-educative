"use client";

import { useState, useEffect, useMemo, useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toastMsg from "@/utils/toaster";
import { useRouter } from "next/navigation";
import { FaTimes, FaUserEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import userImage from "@/assets/images/user.png";
import Image from "next/image";
import { CustomUser } from "@/abstract/type";
import {
  AnimatedInput,
  AnimatedSelect,
} from "@/components/custom-ui/animatedInput";
import { getUsersServer } from "../server/server";
import { LoaderContext } from "@/context/loaderContext";
import CustomModal from "@/components/custom-ui/customModal";

async function getUsers() {
  const response = await getUsersServer();
  const users = response;
  return users as CustomUser[];
}

export default function UsersPage() {
  const [users, setUsers] = useState<CustomUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<CustomUser[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usertype, setUserType] = useState("");
  const [editingUser, setEditingUser] = useState<CustomUser | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { setLoading } = useContext(LoaderContext);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getUsers().then((fetchedUsers) => {
      setLoading(false);
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers);
    });
  }, []);

  const columns = [
    { key: "index", label: "S.No", sortable: false },
    { key: "name", label: "Name", sortable: false },
    { key: "email", label: "Email", sortable: false },
    { key: "usertype", label: "User Type", sortable: false },
    { key: "created_at", label: "Created At", sortable: false },
    { key: "updated_at", label: "Updated At", sortable: false },
    { key: "action", label: "Action", sortable: false },
  ];

  const filteredUsersList = useMemo(() => {
    return users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  const openEditModal = (user: CustomUser) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setLoading(true);
      const res = fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...editingUser, action: "update" }),
      }).then(async (res) => {
        setLoading(false);
        if (res.ok) {
          const updatedUsers = users.map((user) =>
            user._id === editingUser._id ? editingUser : user
          );
          setUsers(updatedUsers);
          setModalOpen(false);
          setEditingUser(null);
          const res_ = await res.json();
          if (res_.status === 200) {
            toastMsg("success", res_.message);
          } else {
            toastMsg("error", res_.message);
          }
          return res_;
        }
        const res_ = await res.json();
        toastMsg("error", res_.message);
        return res_;
      });
    }
  };

  const deleteUser = (id: string) => async () => {
    setLoading(true);
    const res = fetch(`/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, action: "delete" }),
    }).then(async (res) => {
      setLoading(false);
      if (res.ok) {
        const updatedUsers = users.filter((user) => user._id !== id);
        setUsers(updatedUsers);
        const res_ = await res.json();
        if (res_.status === 200) {
          toastMsg("success", res_.message);
        } else {
          toastMsg("error", res_.message);
        }
        return res_;
      }
      const res_ = await res.json();
      toastMsg("error", res_.message);
      return res_;
    });
  };

  const handleOpenChange = () => {
    setModalOpen(!modalOpen);
  };

  const handleSubmit = () => {
    if (name && email && usertype) {
      setLoading(true);
      fetch("/api/auth/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          usertype: usertype,
          action: "add",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status !== 201) {
            toastMsg("error", data.message);
            setLoading(false);
            return;
          }
          if (data.status === 201) {
            toastMsg("success", data.message);
            setLoading(false);
            getUsers().then((fetchedUsers) => {
              setUsers(fetchedUsers);
              router.push("users");
            });
          }
        });
    } else {
      toastMsg("error", "Please fill all the fields");
    }
  };

  return (
    <>
      <Card className="border rounded-b-lg shadow-lg">
        <CardHeader className="bg-primary">
          <div className="flex justify-between w-full">
            <CardTitle className="text-lg font-semibold text-white ps-4">
              Users List
            </CardTitle>
            <Button
              className="ml-auto mr-4"
              size="sm"
              onClick={() => {
                setUpdateModalOpen(true);
              }}
            >
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardBody className="p-8">
          {users.length > 0 ? (
            <div id="userTable" className="overflow-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 z-20 overflow-auto">
                <thead className="text-xs text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className={`py-3 px-4 border-r relative text-nowrap ${
                          column.sortable ? "cursor-pointer" : ""
                        }`}
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsersList.map((user, index) => (
                    <tr
                      key={user._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
                    >
                      <td
                        key={`${user._id}-0`}
                        className="py-2 px-4 border-r first:border-l text-nowrap"
                      >
                        {index + 1}
                      </td>
                      <td
                        key={`${user._id}-1`}
                        className="py-2 px-4 border-r first:border-l text-nowrap"
                      >
                        <div className="flex">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <Image
                              src={
                                user.avatar
                                  ? "/uploads/avatars/" + user.avatar.filename
                                  : userImage.src
                              }
                              alt=""
                              width={80}
                              height={80}
                              className="rounded-full"
                              onClick={() => {}}
                            />
                          </div>
                          <div className="flex flex-col justify-center pl-2">
                            <p className="font-semibold">{user.name}</p>
                          </div>
                        </div>
                      </td>
                      <td
                        key={`${user._id}-2`}
                        className="py-2 px-4 border-r first:border-l text-nowrap"
                      >
                        {user.email}
                      </td>
                      <td
                        key={`${user._id}-3`}
                        className="py-2 px-4 border-r first:border-l text-nowrap"
                      >
                        {user.usertype?.toUpperCase()}
                      </td>
                      <td
                        key={`${user._id}-4`}
                        className="py-2 px-4 border-r first:border-l text-nowrap"
                      >
                        {new Date(user.created_at!).toLocaleString()}
                      </td>
                      <td
                        key={`${user._id}-5`}
                        className="py-2 px-4 border-r first:border-l text-nowrap"
                      >
                        {new Date(user.updated_at!).toLocaleString()}
                      </td>
                      <td
                        key={`${user._id}-6`}
                        className="py-2 px-4 border-r first:border-l text-nowrap"
                      >
                        <div className="flex gap-2">
                          <Button
                            className="bg-primary hover:bg-accent transition-all duration-300 text-[16px]] p-2"
                            size={"sm"}
                            onClick={() => openEditModal(user)}
                            key={user.email}
                          >
                            <FaUserEdit />
                          </Button>
                          <Button
                            className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-[16px]] p-2"
                            size={"sm"}
                            key={user.email! + index}
                            onClick={deleteUser(user._id!)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : filteredUsersList.length === 0 ? (
            <div className="w-full bg-red-400 h-12 rounded-lg flex items-center ps-4">
              <p className="text-white">
                There are no users to display. Please add some users.
              </p>
            </div>
          ) : null}
        </CardBody>
      </Card>
      <CustomModal
        isOpen={updateModalOpen}
        onOpenChange={() => setUpdateModalOpen(!updateModalOpen)}
        header={"Add User"}
      >
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-4 gap-4">
            <div className="col-span-3 md:col-span-2 lg:col-span-3">
              <AnimatedInput
                label={"Name"}
                type={"text"}
                placeholder={"Enter Name"}
                required={true}
                name={"name"}
                id={"name"}
                className={""}
                onchange={setName}
              />
            </div>
            <div className="col-span-3 md:col-span-2 lg:col-span-3">
              <AnimatedInput
                label={"Email"}
                type={"text"}
                placeholder={"Enter Email ID"}
                required={true}
                name={"email"}
                id={"email"}
                className={""}
                onchange={setEmail}
              />
            </div>
            <div className="col-span-3 md:col-span-2 lg:col-span-3">
              <AnimatedSelect
                label={"User Type"}
                options={[
                  { name: "Admin", value: "admin" },
                  { name: "User", value: "user" },
                ]}
                required={false}
                name={""}
                id={""}
                className={""}
                onChange={(e) => setUserType(e)}
              />
            </div>
            <div className="col-span-3 md:col-span-2 lg:col-span-3">
              <Button
                className="w-full"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Add User
              </Button>
            </div>
          </div>
        </>
      </CustomModal>

      <Modal
        isOpen={modalOpen}
        onOpenChange={handleOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="2xl"
        placement="top-center"
        backdrop="blur"
        hideCloseButton={true}
        motionProps={{
          initial: { opacity: 0, y: -20, scale: 0.9 },
          animate: { opacity: 1, y: 0, scale: 1 },
        }}
        classNames={{
          backdrop: "bg-black bg-opacity-60",
        }}
        className="bg-white text-primary rounded-lg shadow-lg mt-14 w-11/12 border border-primary shadow-slate-500"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between gap-1 border-b p-3 ps-5 font-semibold shadow-sm bg-primary sm:bg-white text-white sm:text-primary rounded-t-sm">
                Update User
                <FaTimes onClick={onClose} className="cursor-pointer mr-3" />
              </ModalHeader>
              <ModalBody className="p-4">
                <form onSubmit={handleEditSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Enter Name"
                      value={editingUser?.name ?? ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser!,
                          name: e.target.value,
                        })
                      }
                      className="border border-primary rounded-md"
                    />
                    <Input
                      placeholder="Email"
                      value={editingUser?.email ?? ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser!,
                          email: e.target.value,
                        })
                      }
                      className="border border-primary rounded-md"
                    />
                    <select
                      className="p-2 border border-black rounded-lg"
                      defaultValue={""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser!,
                          usertype: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Usertype</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <ModalFooter className="mt-3 flex justify-center">
                    <Button
                      type="submit"
                      className="bg-primary text-white rounded-lg w-1/2 hover:bg-accent"
                    >
                      Update
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
