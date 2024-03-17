export type ProjectType = {
  title: string;
  description: string;
  projectUrl?: string;
  agency?: string;
  agencyUrl?: string;
  previewImage?: any;
  gif?: any;
  id?: string;
};

export type ProjectListType = {
  sys: {
    id: string;
  };
};

export type AboutEntryType = {
  title: string;
  content: string;
};
