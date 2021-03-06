import { Container, Typography, Box } from "@mui/material";
import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { Summary } from "../api-types";
import Request from "../Request";

export default function DailyOVerview() {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    Request.get("/summary").then((response: AxiosResponse<Summary>) =>
      setSummary(response.data)
    );
  }, []);

  // trước khi vẽ giao diện, useEffect run code trc khi đẩy lên giao diện html (hàm tự khai báo)

  return (
    <Container>
      <Box>
      <Typography>
        Ngày hôm qua, Thế giới đã ghi nhận{" "}
        <b>
          {summary === null
            ? "Loading..."
            : (summary.Global.NewConfirmed.toLocaleString()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </b>{" "}
        ca, nâng tổng số ca nhiễm trên Thế Giới từ ngày 27/4 đến nay lên{" "}
        <b>
          {summary === null
            ? "Loading..."
            : (summary.Global.TotalConfirmed.toLocaleString()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </b>{" "}
        ca.
      </Typography>
      <Typography component="p">
          Cùng ngày, Bộ Y tế Thế Giới đã công bố{" "}
          <b>
            {summary === null
              ? "Loading..."
              : (summary.Global.NewRecovered.toLocaleString()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </b>{" "}
          người khỏi bệnh và{" "}
          <b>
            {summary === null
              ? "Loading..."
              : (summary.Global.NewDeaths.toLocaleString()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </b>{" "}
          ca tử vong{" "}
      </Typography>
      </Box>
    </Container>
  );
}
