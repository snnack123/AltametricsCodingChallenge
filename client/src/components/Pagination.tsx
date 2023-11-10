import { useCallback, useEffect, useState } from "react";
import { InvoiceDto } from "../types/interfaces";
import { paginationItemsPerPage } from "../utils/constants";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  data: InvoiceDto[];
  setCurrentItems: (currentItems: InvoiceDto[]) => void;
  setCheckedItems?: (checkedItems: boolean) => void;
}

export default function Pagination({ data, setCurrentItems, setCheckedItems }: Readonly<PaginationProps>) {
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [goToPage, setGoToPage] = useState<number | null>(1);
  const [selectedValue, setSelectedValue] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = paginationItemsPerPage;

  useEffect(() => {
    const endOffset: number = itemOffset + itemsPerPage;
    const items = data.slice(itemOffset, endOffset);

    setCurrentItems(items);
    setCheckedItems?.(false);
    setPageCount(Math.ceil(data.length / itemsPerPage));
    setCurrentPage(Math.ceil((itemOffset + 1) / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = useCallback((e: { selected: number }): void => {
    const newOffset: number = (e.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
    setGoToPage(e.selected + 1);
    setSelectedValue(e.selected + 1);
    setCurrentPage(e.selected + 1);
  }, [data.length, itemsPerPage]);

  const handlePageChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const value = e.target.value;

    if (value !== "") {
      if (isNaN(Number(value))) return;
      if (Number(value) > pageCount || Number(value) === 0) return;
      if (value === "-" || value === "+") return;
  
      handlePageClick({ selected: Number(value) - 1 });
    } else {
      setGoToPage(null);
    }
  }, [pageCount, handlePageClick]);

  return (
    <div className="flex">
      <div className="flex items-center ml-8 mr-4">
        <div>Show</div>
        <div className="ml-4 relative">
          <select className="border border-gray-300 rounded-md px-2 py-1 w-[6rem] focus:border-gray-300 focus:outline-none focus:ring-0" onChange={handlePageChange} value={selectedValue}>
          {Array.from({ length: pageCount }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
          </select>
          <div className="absolute top-[9px] bottom-0 right-9 flex items-center px-[1px] pointer-events-none bg-secondary max-h-[1rem]"></div>
        </div>

      </div>
      <ReactPaginate
        breakLabel={"..."}
        nextLabel={<ChevronRightIcon className="h-4 w-4" />}
        previousLabel={<ChevronLeftIcon className="h-4 w-4" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName={"pagination-container"}
        pageClassName={"pagination-item"}
        activeClassName={"pagination-item-active"}
        previousClassName={"pagination-previous"}
        nextClassName={"pagination-next"}
        forcePage={currentPage - 1}
      />
      <div className="ml-4 flex items-center">
        <div>Go to Page</div>
        <div>
          <input
            type="string"
            value={goToPage ?? ""}
            className="ml-2 border border-gray-300 rounded-md px-2 py-1 max-w-[3rem] focus:border-gray-300 focus:outline-none"
            min={1}
            max={pageCount}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
