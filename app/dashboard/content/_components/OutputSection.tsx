'use client';
import React, { useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Copy } from 'lucide-react';

interface Props {
    aiOutput: string | null;
}

const OutputSection = ({ aiOutput }: Props) => {
    const editorRef = useRef<any>(null);

    useEffect(() => {
        if (editorRef.current && aiOutput !== null) {
            const editorInstance = editorRef.current.getInstance();
            editorInstance.setMarkdown(aiOutput);
        }
    }, [aiOutput]);

    const handleCopy = () => {
        const markdown = editorRef.current?.getInstance().getMarkdown();
        if (markdown) {
            navigator.clipboard.writeText(markdown);
            alert('Copied to clipboard!');
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md border mt-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Your result</h2>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                    <Copy size={18} />
                    Copy
                </button>
            </div>

            <Editor
                ref={editorRef}
                initialValue="Your results will appear here..."
                height="500px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
            />
        </div>
    );
};

export default OutputSection;
