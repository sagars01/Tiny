"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";

export default function ImageConverter() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [convertedImage, setConvertedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setSelectedFile(acceptedFiles[0]);
        setConvertedImage(null);
        setError(null);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/webp": [".webp"],
        },
        maxFiles: 1,
    });

    const autoDownload = (dataUrl: string, fileName: string) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = fileName.replace('.webp', '.svg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    async function handleConvert(): Promise<void> {
        if (!selectedFile) return;

        setIsLoading(true);
        setProgress(0);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const response = await fetch("/api/tiny-image-convertor", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to convert image");
            }

            const data = await response.json();
            setConvertedImage(data.convertedImage);
            autoDownload(data.convertedImage, selectedFile.name);

        } catch (err: any) {
            console.error("Error converting image:", err);
            setError(err.message || "Unknown error occurred");
        } finally {
            setIsLoading(false);
            setProgress(100);
        }
    }

    const dropzoneProps = getRootProps();

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md mx-auto space-y-6 bg-card rounded-xl shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-center mb-6">WEBP to SVG Converter</h2>

                <motion.div
                    onClick={dropzoneProps.onClick}
                    onKeyDown={dropzoneProps.onKeyDown}
                    onFocus={dropzoneProps.onFocus}
                    onBlur={dropzoneProps.onBlur}
                    onDrop={dropzoneProps.onDrop}
                    onDragEnter={dropzoneProps.onDragEnter}
                    onDragOver={dropzoneProps.onDragOver}
                    onDragLeave={dropzoneProps.onDragLeave}
                    ref={dropzoneProps.ref}
                    className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors
                        ${isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <input {...getInputProps()} />
                    <div className="space-y-4">
                        {isDragActive ? (
                            <p className="text-lg text-primary">Drop the file here ...</p>
                        ) : (
                            <div>
                                <p className="text-lg mb-2">Drag & drop a WEBP file here</p>
                                <p className="text-sm text-muted-foreground">or click to select</p>
                            </div>
                        )}

                        {selectedFile && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4"
                            >
                                <p className="text-sm">
                                    Selected: <strong className="text-primary">{selectedFile.name}</strong>
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full"
                        >
                            <Progress value={progress} className="w-full h-2" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-destructive text-center p-2 bg-destructive/10 rounded-lg"
                    >
                        {error}
                    </motion.p>
                )}

                <Button
                    className="w-full h-12 text-lg"
                    onClick={handleConvert}
                    disabled={!selectedFile || isLoading}
                    variant="default"
                >
                    {isLoading ? "Converting..." : "Convert to SVG"}
                </Button>

                {convertedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-600 text-center py-2 bg-green-50 rounded-lg"
                    >
                        ✓ Conversion complete! File downloaded.
                    </motion.div>
                )}
            </div>
        </div>
    );
}