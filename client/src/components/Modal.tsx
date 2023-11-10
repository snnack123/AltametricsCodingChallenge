import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { InvoiceDto } from '../types/interfaces';
import { returnShortFormattedDate } from '../utils/utilFunctions';

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    data: InvoiceDto
}

export default function Modal({ open, setOpen, data }: Readonly<ModalProps>) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="leading-6 text-gray-900 underline text-2xl font-bold">
                      Invoice Details
                    </Dialog.Title>
                    <div className="mt-10 flex flex-col justify-center items-center space-y-4">
                      <div className='w-full flex justify-between max-w-[16rem]'>
                        <div className='font-bold'>Invoice ID:</div>
                        <div>{data.id}</div>
                      </div>
                      <div className='w-full flex justify-between max-w-[16rem]'>
                        <div className='font-bold'>Details:</div>
                        <div className='truncate'>{data.details}</div>
                      </div>
                      <div className='w-full flex justify-between max-w-[16rem]'>
                        <div className='font-bold'>Amount:</div>
                        <div className='truncate italic'>$ {data.amount}</div>
                      </div>
                      <div className='w-full flex justify-between max-w-[16rem]'>
                        <div className='font-bold'>Date:</div>
                        <div className='truncate'>{returnShortFormattedDate(data.dueDate)}</div>
                      </div>
                      <div className='w-full flex justify-between max-w-[16rem]'>
                        <div className='font-bold'>Created date:</div>
                        <div className='truncate'>{returnShortFormattedDate(data.createdAt)}</div>
                      </div>
                      <div className='w-full flex justify-between max-w-[16rem]'>
                        <div className='font-bold'>Update date:</div>
                        <div className='truncate'>{returnShortFormattedDate(data.updatedAt)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center mt-8">
                  <button
                    type="button"
                    className="inline-flex w-full max-w-[20rem] justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 sm:col-start-2 focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
