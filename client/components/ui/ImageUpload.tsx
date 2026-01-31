"use client";

import { CldUploadWidget } from 'next-cloudinary';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    if (!mounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <button
                                type="button"
                                onClick={() => onRemove(url)}
                                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget
                onSuccess={onUpload}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "paradise_uploads"}
            >
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }

                    return (
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={onClick}
                            className="flex items-center gap-2 bg-stone-100 text-stone-600 px-4 py-3 rounded-xl hover:bg-stone-200 transition-colors border-2 border-dashed border-stone-300 w-full justify-center"
                        >
                            <ImagePlus className="w-5 h-5" />
                            <span>Upload an Image</span>
                        </button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload;
