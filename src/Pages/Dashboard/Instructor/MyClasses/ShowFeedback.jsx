import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

function ShowFeedback({ isOpen, closeModal, feedback }) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto ">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800  p-4 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-xl text-center dark:text-white text-gray-900"
                                >
                                    Feedback From Admin
                                </Dialog.Title>
                                {feedback.length === 0 ? (
                                    <div className="dark:text-gray-300 text-gray-600 text-center my-5">
                                        No Feedback Here
                                    </div>
                                ) : (
                                    <div className="mt-2 ">
                                        {feedback.map((data) => (
                                            <p className="bg-white rounded-lg p-3 mb-2">{data}</p>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-4">
                                    <button
                                        onClick={closeModal}
                                        type="button"
                                        className="w-full h-11 btn  bg-green text-white hover:bg-dark-grey dark:hover:bg-slate-300 dark:hover:text-black border-none capitalize text-lg"
                                    >
                                        close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default ShowFeedback;
