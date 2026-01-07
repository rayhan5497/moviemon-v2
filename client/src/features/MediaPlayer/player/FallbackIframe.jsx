const CloudflareChallenge = ({ url }) => {
  return (
    <iframe
      title="Cloudflare Challenge"
      src={url}
      key={url}
      className="absolute top-0 left-0 w-full h-full border-0 bg-black rounded"
      allowFullScreen
      sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
    />
  );
};

export default CloudflareChallenge;