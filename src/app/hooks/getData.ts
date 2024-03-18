import { unstable_cache } from "next/cache";

const baseUrl = "https://cdn.contentful.com";

// fetch data from contentful rest api
export const getData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

// get all entries of a space
export const getAllEntries = async () => {
  const url = `${baseUrl}/spaces/${process.env.SPACE_ID}/entries?access_token=${process.env.ACCESS_TOKEN}`;
  const data = await getData(url);
  return data;
};

// get single content type
export const getSingleContentType = async (contentTypeId: string) => {
  const url = `${baseUrl}/spaces/${process.env.SPACE_ID}/environments/master/content_types/${contentTypeId}?access_token=${process.env.ACCESS_TOKEN}`;
  const data = await getData(url);
  return data;
};

// get all entries of a content type
export const getEntriesByContentType = async (contentTypeId: string) => {
  const url = `${baseUrl}/spaces/${process.env.SPACE_ID}/entries?access_token=${process.env.ACCESS_TOKEN}&content_type=${contentTypeId}`;
  const data = await getData(url);
  if (data.items) {
    const projects = await Promise.all(
      data.items.map(async (item: any) => {
        const video = item.fields.siteBrowseVideo
          ? await getImage(item.fields.siteBrowseVideo?.sys.id)
          : null;
        const gif = item.fields.gif
          ? await getImage(item.fields.gif?.sys.id)
          : null;
        const previewImage = item.fields.previewImage
          ? await getImage(item.fields.previewImage?.sys.id)
          : null;

        return {
          title: item.fields.title,
          description: item.fields.description,
          agency: item.fields.agency ?? "",
          agencyUrl: item.fields.agencyUrl ?? "",
          projectUrl: item.fields.projectUrl,
          previewImage: previewImage,
          gif: gif,
          video: video,
          id: item.sys.id,
        };
      })
    );

    return projects;
  }
};

export const getImage = async (assetId: string) => {
  const url = `${baseUrl}/spaces/${process.env.SPACE_ID}/assets/${assetId}?access_token=${process.env.ACCESS_TOKEN}`;
  const data = await getData(url);
  return data;
};

// get single entry by entry id
export const getSingleEntry = async (entryId: string) => {
  const url = `${baseUrl}/spaces/${process.env.SPACE_ID}/entries/${entryId}?access_token=${process.env.ACCESS_TOKEN}`;
  const data = await getData(url);
  return data;
};
