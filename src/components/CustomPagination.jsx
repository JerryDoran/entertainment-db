import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const paginationTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 40
      }}
    >
      <ThemeProvider theme={paginationTheme}>
        <Pagination
          count={numOfPages}
          onChange={(e) => handlePageChange(e.target.textContent)}
          color="primary"
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
