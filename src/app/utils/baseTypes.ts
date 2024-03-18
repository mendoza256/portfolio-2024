export type ProjectType = {
  title: string;
  description: string;
  projectUrl?: string;
  agency?: string;
  agencyUrl?: string;
  // FIXME
  previewImage?: any;
  // FIXME
  gif?: any;
  id?: string;
  // FIXME
  video: any;
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
