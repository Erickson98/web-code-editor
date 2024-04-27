export const decodeBase64 = (encode) => {
  try {
    let decodedContent = decodeURIComponent(atob(encode));
    let separator = "|||";
    let content = decodedContent.split(separator);
    if (content[2] === "undefined" || content[2] === undefined) {
      content[2] = "";
    }
    if (content[5] === "undefined" || content[2] === undefined) {
      content[5] = "";
    }
    return { encode, content };
  } catch (error) {
    console.error(error);
  }
};

export const urlEncode = (url) => {
  try {
    const split = url.split("/");
    return split[split.length - 1];
  } catch (error) {
    console.error("error:", error.message);
  }
};
