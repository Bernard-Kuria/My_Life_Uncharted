"use client";

import { ChangeEvent, DragEvent, useEffect, useId, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  deleteBlogDocument,
  getBlogDocumentUrl,
  uploadBlogDocument,
} from "@services/FirestoreStorage";

type DocumentData = {
  src: string;
  name?: string;
  mimeType?: string;
  size?: number;
};

type DocumentBlock = {
  id: string;
  data: DocumentData;
};

type DocumentProps = {
  customBlock: DocumentBlock;
  modifyCustom: (update: {
    customBlockId: string;
    data: DocumentData;
  }) => void;
};

const MAX_DOCUMENT_SIZE = 20 * 1024 * 1024;
const DOCUMENT_EXTENSIONS = ["pdf", "doc", "docx"];
const DOCUMENT_ACCEPT = [
  ".pdf",
  ".doc",
  ".docx",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
].join(",");

function isSupportedDocument(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  return DOCUMENT_EXTENSIONS.includes(extension);
}

function formatFileSize(size = 0) {
  if (!size) return "";
  if (size < 1024 * 1024) return `${Math.ceil(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentEditor({
  customBlock,
  modifyCustom,
}: DocumentProps) {
  const inputId = useId();
  const dropArea = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadDocument() {
      if (!customBlock.data.src) {
        setUrl(null);
        return;
      }
      const downloadUrl = await getBlogDocumentUrl(customBlock.data.src);
      if (active) setUrl(downloadUrl);
    }

    loadDocument();
    return () => {
      active = false;
    };
  }, [customBlock.data.src]);

  async function selectDocument(file: File) {
    setError(null);

    if (!isSupportedDocument(file)) {
      setError("Choose a PDF or Word document (.pdf, .doc, or .docx).");
      return;
    }
    if (file.size > MAX_DOCUMENT_SIZE) {
      setError("Documents must be 20 MB or smaller.");
      return;
    }

    setUploading(true);
    try {
      const storageName = `${crypto.randomUUID()}-${file.name}`;
      const downloadUrl = await uploadBlogDocument(file, storageName);
      if (!downloadUrl) throw new Error("Upload failed");

      modifyCustom({
        customBlockId: customBlock.id,
        data: {
          src: storageName,
          name: file.name,
          mimeType: file.type,
          size: file.size,
        },
      });
      setUrl(downloadUrl);
    } catch (uploadError) {
      console.error("Document upload failed:", uploadError);
      setError("The document could not be uploaded. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete() {
    if (!customBlock.data.src) return;
    setDeleting(true);
    setError(null);
    try {
      const deleted = await deleteBlogDocument(customBlock.data.src);
      if (!deleted) throw new Error("Delete failed");
      modifyCustom({
        customBlockId: customBlock.id,
        data: { src: "", name: "", mimeType: "", size: 0 },
      });
      setUrl(null);
    } catch (deleteError) {
      console.error("Document deletion failed:", deleteError);
      setError("The document could not be deleted. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) void selectDocument(file);
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    dropArea.current?.classList.remove("border-blue-500");
    const file = event.dataTransfer.files?.[0];
    if (file) void selectDocument(file);
  }

  const displayName = customBlock.data.name || customBlock.data.src;

  return (
    <div className="relative w-full border border-(--secondary-blue) rounded-[10px] p-4">
      {customBlock.data.src ? (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] bg-(--secondary-blue)/15 text-(--primary-blue) dark:text-(--secondary-blue)">
            <FontAwesomeIcon icon={["fas", "file"]} className="text-2xl" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold break-all">{displayName}</div>
            <div className="detail-text opacity-70">
              {formatFileSize(customBlock.data.size)}
            </div>
          </div>
          <div className="flex gap-2">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="buttonInverted"
              >
                Open
              </a>
            )}
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="button disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Replace"}
            </button>
          </div>
        </div>
      ) : (
        <div
          ref={dropArea}
          onDrop={handleDrop}
          onDragOver={(event) => {
            event.preventDefault();
            dropArea.current?.classList.add("border-blue-500");
          }}
          onDragLeave={() =>
            dropArea.current?.classList.remove("border-blue-500")
          }
          className="grid min-h-48 place-items-center border-2 border-dashed rounded-[10px] transition-colors"
        >
          <input
            id={inputId}
            type="file"
            accept={DOCUMENT_ACCEPT}
            className="hidden"
            onChange={handleChange}
            disabled={uploading}
          />
          <label
            htmlFor={inputId}
            className="flex cursor-pointer flex-col items-center gap-3 p-6 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border">
              <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
            </span>
            <strong>
              {uploading ? "Uploading document..." : "Drop a document here"}
            </strong>
            <span className="detail-text opacity-70">
              PDF or Word (.pdf, .doc, .docx), up to 20 MB
            </span>
          </label>
        </div>
      )}
      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
    </div>
  );
}

export function DocumentOutput({ customBlock }: { customBlock: DocumentBlock }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (!customBlock.data.src) return;

    getBlogDocumentUrl(customBlock.data.src).then((downloadUrl) => {
      if (active) setUrl(downloadUrl);
    });

    return () => {
      active = false;
    };
  }, [customBlock.data.src]);

  if (!customBlock.data.src) return <></>;

  return (
    <div className="my-4 flex items-center gap-4 rounded-[10px] border border-(--secondary-blue) p-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-(--secondary-blue)/15 text-(--primary-blue) dark:text-(--secondary-blue)">
        <FontAwesomeIcon icon={["fas", "file"]} className="text-xl" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold break-all">
          {customBlock.data.name || customBlock.data.src}
        </div>
        <div className="detail-text opacity-70">
          {formatFileSize(customBlock.data.size)}
        </div>
      </div>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="buttonInverted shrink-0"
        >
          Open document
        </a>
      )}
    </div>
  );
}
