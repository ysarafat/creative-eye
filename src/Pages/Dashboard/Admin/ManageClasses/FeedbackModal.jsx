import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

function FeedbackModal({ isOpen, setIsOpen, closeModal, id }) {
    const [feedbackText, setFeedbackText] = useState('');
    const [axiosSecure] = useAxiosSecure();

    const handleFeedbackChange = (event) => {
        setFeedbackText(event.target.value);
    };
    const sentFeedback = () => {
        setIsOpen(false);
        const feedback = { feedback: feedbackText };
        console.log(feedback);
        axiosSecure.put(`/sent-feedback/${id}`, feedback).then((data) => console.log(data));
    };

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
                                    Sent Feedback To Instructor
                                </Dialog.Title>

                                <div className="mt-2 ">
                                    <textarea
                                        className="py-2 outline-none border-none shadow focus:shadow-lg dark:bg-slate-900 dark:text-white  rounded-lg px-3 text-lg  w-full my-2 border bg-white focus:border-green"
                                        name="feedback"
                                        onChange={handleFeedbackChange}
                                        cols="30"
                                        rows="10"
                                        placeholder="Here Type Your Feedback"
                                    />
                                </div>

                                <div className="mt-4">
                                    <button
                                        onClick={sentFeedback}
                                        type="button"
                                        className="w-full h-11 btn  bg-green text-white hover:bg-dark-grey dark:hover:bg-slate-300 dark:hover:text-black border-none capitalize text-lg"
                                    >
                                        sent feedback
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

export default FeedbackModal;
