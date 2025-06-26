'use client';

import React, { useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { Copy, FileText, FileCode2, Eye, EyeOff } from 'lucide-react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface Props {
    aiOutput: string | null;
}

const InitialContentPlugin = ({ aiOutput }: { aiOutput: string | null }) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (aiOutput) {
            editor.update(() => {
                const root = $getRoot();
                root.clear();
                const paragraph = $createParagraphNode();
                paragraph.append($createTextNode(aiOutput));
                root.append(paragraph);
            });
        }
    }, [aiOutput, editor]);

    return null;
};

const OutputSection = ({ aiOutput }: Props) => {
    const [copied, setCopied] = useState(false);
    const [value, setValue] = useState('');
    const [html, setHtml] = useState('');
    const [showRich, setShowRich] = useState(true);

    const config = {
        namespace: 'OutputEditor',
        theme: {},
        editable: true,
        onError(error: unknown) {
            console.error('Lexical error:', error);
        },
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExportTxt = () => {
        const blob = new Blob([value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleExportHtml = () => {
        // Use the raw value (your HTML code), not the rendered HTML
        const blob = new Blob([value], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.html';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Word and character count
    const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
    const charCount = value.length;

    return (
        <div className="bg-white p-4 rounded-xl shadow-md border mt-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Your result</h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition"
                        title="Copy"
                    >
                        <Copy size={18} />
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                        onClick={handleExportTxt}
                        className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition"
                        title="Export as TXT"
                    >
                        <FileText size={18} />
                        TXT
                    </button>
                    <button
                        onClick={handleExportHtml}
                        className="flex items-center gap-2 bg-purple-500 text-white px-3 py-2 rounded-md hover:bg-purple-600 transition"
                        title="Export as HTML"
                    >
                        <FileCode2 size={18} />
                        HTML
                    </button>
                    <button
                        onClick={() => setShowRich((v) => !v)}
                        className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300 transition"
                        title={showRich ? "Show Plain Text" : "Show Rich Text"}
                    >
                        {showRich ? <EyeOff size={18} /> : <Eye size={18} />}
                        {showRich ? "Plain" : "Rich"}
                    </button>
                </div>
            </div>

            <div className="mb-2 text-sm text-gray-500 flex gap-4">
                <span>Words: {wordCount}</span>
                <span>Characters: {charCount}</span>
            </div>

            <LexicalComposer initialConfig={config}>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            className={`min-h-[300px] max-h-[600px] overflow-y-auto border rounded-md p-4 text-base focus:outline-none bg-gray-50 ${showRich ? '' : 'hidden'
                                }`}
                        />
                    }
                    placeholder={
                        <div className="text-gray-400 px-4 py-2">
                            Your results will appear here...
                        </div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <OnChangePlugin
                    onChange={(editorState, editor) => {
                        editorState.read(() => {
                            const text = $getRoot().getTextContent();
                            setValue(text);
                            // Get HTML for export
                            const dom = editor.getRootElement();
                            setHtml(dom ? dom.innerHTML : '');
                        });
                    }}
                />
                <InitialContentPlugin aiOutput={aiOutput} />
            </LexicalComposer>
        </div>
    );
};

export default OutputSection;