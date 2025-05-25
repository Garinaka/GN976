function Container({ children }) {
    return (
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {children}
      </div>
    );
  }
  
  export default Container;
  