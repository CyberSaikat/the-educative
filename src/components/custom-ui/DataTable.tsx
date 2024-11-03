import React, { useEffect, useState } from "react";
import { FaUserEdit, FaTrash, FaTh, FaTable } from "react-icons/fa";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "../ui/switch";

type Column = {
  label: string;
  sortable?: boolean;
  render?: (item: any) => JSX.Element;
  name: string;
};

type DataTableProps = {
  columns: Column[];
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  itemPerPage?: number;
  visibilitySwitch?: (item: any) => void;
};

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
  itemPerPage = 10,
  visibilitySwitch,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  useEffect(() => {
    if (!data) return;
    const filter = data.filter((item) => {
      return columns.some((column) => {
        return item[column.name]
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
    });
    setFilteredData(filter);
    setCurrentPage(1);
  }, [searchQuery, data]);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredData.length / itemPerPage);

  const calculateDelay = (index: number) => {
    const baseDelay = 0.1; // Base delay in seconds
    const delayIncrement = 0.03; // Delay increment per row
    const maxDelay = 0.5; // Maximum delay in seconds

    const delay = baseDelay + index * delayIncrement;
    return Math.min(delay, maxDelay);
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: calculateDelay(i),
      },
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        delay: calculateDelay(i) / 2,
      },
    }),
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: calculateDelay(i),
      },
    }),
    exit: (i: number) => ({
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        delay: calculateDelay(i) / 2,
      },
    }),
  };

  const renderTableContent = () => (
    <motion.tbody
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <AnimatePresence mode="popLayout">
        {currentData.map((item, index) => (
          <motion.tr
            key={item._id}
            custom={index}
            variants={rowVariants}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
          >
            <td className="py-2 px-4 border-r first:border-l text-nowrap">
              {indexOfFirstItem + index + 1}
            </td>
            {columns.map((column) => (
              <td
                key={`${item._id}-${column.label}`}
                className="py-2 px-4 border-r first:border-l text-nowrap"
              >
                {column.render ? column.render(item) : item[column.label]}
              </td>
            ))}
            {/* {visibilitySwitch ? (
              <td className="py-2 px-4 border-r first:border-l text-nowrap">
                <Switch
                  checked={item.visible}
                  onChange={(checked) => {
                    alert("Visibility switch is clicked");
                    visibilitySwitch(item);
                  }}
                  className={`${
                    item.visible ? "bg-primary" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span
                    className={`${
                      item.visible ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </td>
            ) : null} */}
            <td className="py-2 px-4 border-r first:border-l text-nowrap">
              <div className="flex gap-2">
                <Button
                  className="bg-primary hover:bg-accent transition-all duration-300 text-[16px] p-2"
                  size={"sm"}
                  onClick={() => onEdit(item)}
                >
                  <FaUserEdit />
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-[16px] p-2"
                  size={"sm"}
                  onClick={() => onDelete(item._id)}
                >
                  <FaTrash />
                </Button>
              </div>
            </td>
          </motion.tr>
        ))}
      </AnimatePresence>
    </motion.tbody>
  );

  const renderGridContent = () => (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <AnimatePresence mode="popLayout">
        {currentData.map((item, index) => (
          <motion.div
            key={item._id}
            custom={index}
            variants={gridItemVariants}
            className="bg-white border rounded-md p-4 shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex flex-col gap-2">
              {columns.map((column) => (
                <div key={column.label} className="flex justify-between">
                  <span className="font-semibold pr-2 inline-block">
                    {column.label}:
                  </span>
                  <span>
                    {column.render ? column.render(item) : item[column.label]}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                className="bg-primary hover:bg-accent transition-all duration-300 text-[16px] p-2"
                size={"sm"}
                onClick={() => onEdit(item)}
              >
                <FaUserEdit />
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-[16px] p-2"
                size={"sm"}
                onClick={() => onDelete(item._id)}
              >
                <FaTrash />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-in-out"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center gap-2 ml-4">
          <Button
            className={`px-4 py-2 border rounded-md ${
              viewMode === "table"
                ? "bg-primary text-white hover:bg-accent"
                : "bg-white text-gray-800"
            }`}
            onClick={() => setViewMode("table")}
          >
            <FaTable />
          </Button>
          <Button
            className={`px-4 py-2 border rounded-md ${
              viewMode === "grid"
                ? "bg-primary text-white hover:bg-accent"
                : "bg-white text-gray-800"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <FaTh />
          </Button>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {viewMode === "table" ? (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div id="userTable" className="overflow-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 z-20 overflow-auto">
                <thead className="text-xs text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4 border-r relative text-nowrap">
                      Sl No.
                    </th>
                    {columns.map((column) => (
                      <th
                        key={column.label}
                        className={`py-3 px-4 border-r relative text-nowrap ${
                          column.sortable ? "cursor-pointer" : ""
                        }`}
                      >
                        {column.label}
                      </th>
                    ))}
                    {/* {visibilitySwitch ? (
                      <th className="py-3 px-4 border-r relative text-nowrap">
                        Visibility
                      </th>
                    ) : null} */}
                    <th className="py-3 px-4 border-r relative text-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                {currentData?.length > 0 ? (
                  renderTableContent()
                ) : (
                  <tbody>
                    <tr>
                      <td
                        colSpan={columns.length + 2}
                        className="text-center py-4"
                      >
                        No data found
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentData?.length > 0 ? (
              renderGridContent()
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white border rounded-md p-4 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="font-semibold pr-2 inline-block">
                        No data found
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mt-4">
        <div></div>
        <div className="flex justify-center">
          <nav>
            <ul className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1}>
                  <Button
                    className={`px-4 py-2 border rounded-md ${
                      index + 1 === currentPage
                        ? "bg-primary text-white hover:bg-accent"
                        : "bg-white text-gray-800"
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="text-gray-600">
          <span>
            {currentData.length} of {filteredData.length}
          </span>
        </div>
      </div>
    </>
  );
};

export default DataTable;
