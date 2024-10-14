export interface FormData {
  orientation: "landscape" | "portrait";
  name: {
    text: string;
    fontSize: number;
  },
  furigana: {
    text: string;
    fontSize: number;
  },
  introduction: {
    text: string;
    fontSize: number;
  },
  avatar: FileList;
  yourcolor: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  twitter: string;
  fediverse: string;
  facebook: string;
  instagram: string;
}

export let emptyFiles = new DataTransfer().files;
