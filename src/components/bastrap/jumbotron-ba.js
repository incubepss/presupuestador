export default function JumbotronBA({ title, img, children }) {
  var imgBackground = { backgroundImage: "url(" + img + ")" };
  return (
    <>
      <div className="jumbotron jumbotron-main" style={imgBackground}>
        <div className="container">
          <h1 className="display-4">{title}</h1>
          {children}
        </div>
      </div>
    </>
  );
}
