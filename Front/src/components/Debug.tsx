const Debug = ({ data }) => (
  <div style={{ 
    position: 'fixed', 
    bottom: 0, 
    right: 0, 
    background: '#000', 
    color: '#fff', 
    padding: '10px',
    maxHeight: '200px',
    overflow: 'auto',
    zIndex: 9999
  }}>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

export default Debug;
