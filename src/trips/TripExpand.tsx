import { RefObject, useEffect, useRef } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { TripShowTripLogSummary } from "./TripShow/TripShowTripLogSummary";
import { TripShowDetails, TripShowCustomer } from "./TripShow";

export const TripExpand = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useScrollAdjustment(ref);

  return (
    <Box ref={ref} padding={1}>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 2,
        }}
      >
        <Grid container>
          <Grid size={{ xs: 3 }}>
            <TripShowDetails />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <TripShowCustomer />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TripShowTripLogSummary />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

function useScrollAdjustment(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const initialBottom = window.innerHeight;

    const timeout = setTimeout(() => {
      const rect = element.getBoundingClientRect();

      if (rect.bottom > initialBottom) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);
}