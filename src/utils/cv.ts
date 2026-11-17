// The URL changes only when the PDF changes, so cached downloads always refer to one version.
export const cvDownloadUrl = `${import.meta.env.BASE_URL}cv.pdf?v=${import.meta.env.PUBLIC_CV_VERSION}`
