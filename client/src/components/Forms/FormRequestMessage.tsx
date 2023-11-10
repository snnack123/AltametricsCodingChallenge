interface FormRequestMessageProps {
    readonly requestError: boolean;
    readonly requestMessage: string;
}

export default function FormRequestMessage({requestError, requestMessage}: FormRequestMessageProps) {
    return (
        <p
            className={`text-center text-sm font-medium ${
                requestError ? "text-red-500" : "text-green-500"
            }`}>
            {requestMessage.length > 0 ? requestMessage : <span>&nbsp;</span>}
        </p>
    );
}
