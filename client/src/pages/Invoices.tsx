import { useCallback, useEffect, useState } from "react";
import { PrinterIcon, Cog6ToothIcon, PencilIcon, ArrowsUpDownIcon, } from "@heroicons/react/24/outline";
import { InvoiceDto } from "../types/interfaces";
import { API } from "../app/api";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { AxiosResponse } from "axios";
import Pagination from "../components/Pagination";
import { returnShortFormattedDate } from "../utils/utilFunctions";
import TableHead from "../components/TableHead";
import Modal from "../components/Modals/Modal";

export default function Invoices() {
  const [invoices, setInvoices] = useState<InvoiceDto[]>([]);
  const [currentInvoices, setCurrentInvoices] = useState<InvoiceDto[]>([]);
  const [checkedItems, setCheckedItems] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.user.token);
   // Sorting state variables
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<InvoiceDto | null>(null);

  useEffect(() => {
    if (invoices.length > 0) return;
    getInvoices();
  }, []);

  useEffect(() => {
    checkAllDates();
  }, [checkedItems]);

  const openModalHandler = useCallback((status: boolean, data: InvoiceDto): void => {
    if (status) {
      setModalData(data);
      setOpenModal(true);
    } else {
      setModalData(null);
      setOpenModal(false);
    }
  }, []);

  const getInvoices = useCallback(async (): Promise<void> => {
    if (!token) return;

    const response: AxiosResponse<InvoiceDto[]> = await API.invoices.getInvoices(token);

    const updatedInvoices = response.data.map((invoice) => ({
      ...invoice,
      checked: false,
    }));

    setInvoices(updatedInvoices);
  }, [token]);

  const checkAllDates = useCallback((): void => {
    setCurrentInvoices(
      currentInvoices.map((item) => {
        item.checked = checkedItems;
        return item;
      })
    );

    if (!checkedItems) {
      setInvoices(
        invoices.map((item) => {
          item.checked = false;
          return item;
        })
      );
    }
  }, [checkedItems]);

  const checkDate = useCallback((id: number): void => {
    const mappedInvoices = currentInvoices.map((invoice) => {
      if (invoice.id === id) {
        invoice.checked = !invoice.checked;
      }
      return invoice;
    });

    const boxesCheckedNumber = mappedInvoices.filter((invoice) => invoice.checked).length;

    if (boxesCheckedNumber === mappedInvoices.length) {
      setCheckedItems(true);
    } else {
      setCheckedItems(false);
    }

    setCurrentInvoices(mappedInvoices);
  }, [currentInvoices]);

  const sortData = useCallback((data: InvoiceDto[], field: keyof InvoiceDto): void => {
    data.sort((a, b) => {
      // Use non-null assertion here
      if (a[field]! < b[field]!) return sortDirection === "asc" ? -1 : 1;
      if (a[field]! > b[field]!) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setSortDirection("asc");
  }, [sortDirection]);

  const sortDataHandler = useCallback((field: keyof InvoiceDto): void => {
    let sortedInvoices: InvoiceDto[] = [...currentInvoices];
  
    if (sortField === field) {
      sortedInvoices.reverse();
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      sortData(sortedInvoices, field);
    }
  
    setSortField(field);
    setCurrentInvoices(sortedInvoices);
  }, [currentInvoices, sortField, sortDirection, sortData]);

  return (
    <div className="ml-8 mr-14 mt-14">
      <div className="flex space-x-6 justify-end">
        <PrinterIcon className="iconStyles" aria-hidden="true" />
        <Cog6ToothIcon className="iconStyles" aria-hidden="true" />
        <PencilIcon className="iconStyles" aria-hidden="true" />
      </div>

      {invoices.length > 0 && (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-2">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <TableHead classes="sm:pl-6 flex items-center justify-between pl-4">
                          <div className="flex items-center">
                              <input type="checkbox" checked={checkedItems} onChange={() => setCheckedItems(!checkedItems)} className="focus:ring-0"/>
                              <div className="ml-4">Date</div>
                          </div>
                          <ArrowsUpDownIcon className="iconStyles" onClick={() => sortDataHandler("dueDate")}/>
                        </TableHead>
                        <TableHead>
                          <div className="flex justify-between">
                            <div>Details</div>
                            <ArrowsUpDownIcon className="iconStyles" onClick={() => sortDataHandler("details")}/>
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex justify-between">
                              <div>Amount</div>
                              <ArrowsUpDownIcon className="iconStyles" onClick={() => sortDataHandler("amount")}/>
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex justify-between">
                              <div>Created At</div>
                              <ArrowsUpDownIcon className="iconStyles" onClick={() => sortDataHandler("createdAt")}/>
                          </div>
                        </TableHead>
                        <TableHead classes="border-none">
                          <div className="flex justify-between">
                              <div>Updated At</div>
                              <ArrowsUpDownIcon className="iconStyles" onClick={() => sortDataHandler("updatedAt")}/>
                          </div>
                        </TableHead>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {currentInvoices.map((invoice) => (
                        <tr key={invoice.id} className="cursor-pointer hover:bg-gray-100" onClick={() => openModalHandler(true, invoice)}>
                          <td className="tableTd font-medium text-gray-900 sm:pl-6 flex items-center">
                            <input type="checkbox" checked={invoice.checked} onChange={() => checkDate(invoice.id)} className="focus:ring-0"/>
                            <span className="ml-4">{returnShortFormattedDate(invoice.dueDate)}</span>
                          </td>
                          <td className="tableTd">
                            {invoice.details}
                          </td>
                          <td className="tableTd italic">
                            $ {invoice.amount}
                          </td>
                          <td className="tableTd">
                            {returnShortFormattedDate(invoice.createdAt)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            {returnShortFormattedDate(invoice.updatedAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-100 border-b border-gray-200 rounded-full">
                      <tr>
                        <td className="border-r p-2" colSpan={5}>
                          <Pagination
                            data={invoices}
                            setCurrentItems={setCurrentInvoices}
                            setCheckedItems={setCheckedItems}
                          />
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {modalData && <Modal open={openModal} setOpen={setOpenModal} data={modalData} />}
        </div>
      )}
    </div>
  );
}
