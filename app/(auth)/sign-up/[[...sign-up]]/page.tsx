import { SignUp } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow-lg">
                <SignUp />
            </div>
        </div>
    );
}
