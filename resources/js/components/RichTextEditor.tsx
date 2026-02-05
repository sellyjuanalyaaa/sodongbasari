import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Link2,
    Image as ImageIcon,
    Undo,
    Redo,
    Heading1,
    Heading2,
    Heading3,
    Palette
} from 'lucide-react';
import { Button } from './ui/button';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, placeholder = 'Tulis isi berita di sini...' }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-[#EFA00B] underline hover:text-orange-600',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg',
                },
            }),
            TextStyle,
            Color,
        ],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose prose-slate max-w-none min-h-[300px] p-4 focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    const addImage = () => {
        const url = window.prompt('Masukkan URL gambar:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const url = window.prompt('Masukkan URL link:', editor.getAttributes('link').href);
        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const setColor = () => {
        const color = window.prompt('Masukkan kode warna (contoh: #EFA00B):');
        if (color) {
            editor.chain().focus().setColor(color).run();
        }
    };

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
                {/* Text Formatting */}
                <div className="flex gap-1 border-r border-gray-200 pr-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'bg-gray-200' : ''}
                        title="Bold (Ctrl+B)"
                    >
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'bg-gray-200' : ''}
                        title="Italic (Ctrl+I)"
                    >
                        <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive('underline') ? 'bg-gray-200' : ''}
                        title="Underline (Ctrl+U)"
                    >
                        <UnderlineIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'bg-gray-200' : ''}
                        title="Strikethrough"
                    >
                        <Strikethrough className="h-4 w-4" />
                    </Button>
                </div>

                {/* Headings */}
                <div className="flex gap-1 border-r border-gray-200 pr-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}
                        title="Heading 1"
                    >
                        <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
                        title="Heading 2"
                    >
                        <Heading2 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}
                        title="Heading 3"
                    >
                        <Heading3 className="h-4 w-4" />
                    </Button>
                </div>

                {/* Lists */}
                <div className="flex gap-1 border-r border-gray-200 pr-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
                        title="Bullet List"
                    >
                        <List className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
                        title="Ordered List"
                    >
                        <ListOrdered className="h-4 w-4" />
                    </Button>
                </div>

                {/* Text Alignment */}
                <div className="flex gap-1 border-r border-gray-200 pr-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}
                        title="Align Left"
                    >
                        <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}
                        title="Align Center"
                    >
                        <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}
                        title="Align Right"
                    >
                        <AlignRight className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        className={editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''}
                        title="Justify"
                    >
                        <AlignJustify className="h-4 w-4" />
                    </Button>
                </div>

                {/* Insert */}
                <div className="flex gap-1 border-r border-gray-200 pr-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={setLink}
                        className={editor.isActive('link') ? 'bg-gray-200' : ''}
                        title="Insert Link"
                    >
                        <Link2 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={addImage}
                        title="Insert Image"
                    >
                        <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={setColor}
                        title="Text Color"
                    >
                        <Palette className="h-4 w-4" />
                    </Button>
                </div>

                {/* Undo/Redo */}
                <div className="flex gap-1">
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        title="Redo (Ctrl+Y)"
                    >
                        <Redo className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Editor Content */}
            <div className="bg-white">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default RichTextEditor;
