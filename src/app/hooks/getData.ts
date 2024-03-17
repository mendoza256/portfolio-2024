const baseUrl = "https://cdn.contentful.com";

// fetch data from contentful rest api
export const getData = async (url: string) => {
  const response = await fetch(url);
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
        return {
          title: item.fields.title,
          description: item.fields.description,
          agency: item.fields.agency ?? "",
          agencyUrl: item.fields.agencyUrl ?? "",
          projectUrl: item.fields.projectUrl,
          previewImage: await getImage(item.fields.previewImage.sys.id),
          gif: await getImage(item.fields.gif.sys.id),
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
