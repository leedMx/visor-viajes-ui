import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GpsOffRoundedIcon from "@mui/icons-material/GpsOffRounded";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import type { ReactNode } from "react";

type AttentionSeverity = "error" | "warning" | "info" | "neutral";

export type AttentionItem = {
  id: string;
  label: string;
  count: number;
  severity: AttentionSeverity;
  icon?: ReactNode;
  onClick?: () => void;
};

type AttentionPanelProps = {
  title?: string;
  items: AttentionItem[];
  emptyMessage?: string;
};

const severityToColor = (
  severity: AttentionSeverity,
  theme: ReturnType<typeof useTheme>
) => {
  switch (severity) {
    case "error":
      return {
        bg: theme.palette.error.light,
        fg: theme.palette.error.main,
        softBg: theme.palette.mode === "dark" ? "rgba(211,47,47,0.12)" : "rgba(211,47,47,0.08)",
        border: theme.palette.error.main,
      };
    case "warning":
      return {
        bg: theme.palette.warning.light,
        fg: theme.palette.warning.main,
        softBg: theme.palette.mode === "dark" ? "rgba(237,108,2,0.12)" : "rgba(237,108,2,0.08)",
        border: theme.palette.warning.main,
      };
    case "info":
      return {
        bg: theme.palette.info.light,
        fg: theme.palette.info.main,
        softBg: theme.palette.mode === "dark" ? "rgba(2,136,209,0.12)" : "rgba(2,136,209,0.08)",
        border: theme.palette.info.main,
      };
    case "neutral":
    default:
      return {
        bg: theme.palette.grey[300],
        fg: theme.palette.text.secondary,
        softBg: theme.palette.action.hover,
        border: theme.palette.divider,
      };
  }
};

const defaultIcon = (severity: AttentionSeverity) => {
  switch (severity) {
    case "error":
      return <ErrorOutlineRoundedIcon fontSize="small" />;
    case "warning":
      return <WarningAmberRoundedIcon fontSize="small" />;
    case "info":
      return <InfoOutlinedIcon fontSize="small" />;
    case "neutral":
    default:
      return <GpsOffRoundedIcon fontSize="small" />;
  }
};

export const AttentionPanel = ({
  title = "Attention Required",
  items,
  emptyMessage = "All systems normal",
}: AttentionPanelProps) => {
  const theme = useTheme();

  const activeItems = items.filter((item) => item.count > 0);
  const totalAttention = activeItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))"
            : "linear-gradient(180deg, #ffffff, #fbfbfc)",
      }}
    >
      <CardContent sx={{ p: 2.25, "&:last-child": { pb: 2.25 } }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Operational exceptions and risks
              </Typography>
            </Box>

            {activeItems.length > 0 ? (
              <Chip
                label={`${totalAttention} open`}
                color="error"
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            ) : (
              <Chip
                label="OK"
                color="success"
                variant="outlined"
                icon={<CheckCircleRoundedIcon />}
                sx={{ fontWeight: 600 }}
              />
            )}
          </Stack>

          <Divider />

          {activeItems.length === 0 ? (
            <Box
              sx={{
                minHeight: 180,
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                borderRadius: 3,
                backgroundColor: theme.palette.action.hover,
              }}
            >
              <Stack spacing={1} alignItems="center">
                <CheckCircleRoundedIcon color="success" />
                <Typography variant="h6" fontWeight={700}>
                  {emptyMessage}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  No issues require immediate review
                </Typography>
              </Stack>
            </Box>
          ) : (
            <Stack spacing={1.25}>
              {activeItems.map((item, index) => {
                const colors = severityToColor(item.severity, theme);

                return (
                  <Box key={item.id}>
                    <Box
                      onClick={item.onClick}
                      sx={{
                        p: 1.25,
                        borderRadius: 3,
                        backgroundColor: colors.softBg,
                        borderLeft: `4px solid ${colors.border}`,
                        cursor: item.onClick ? "pointer" : "default",
                        transition: "transform 0.15s ease, background-color 0.15s ease",
                        "&:hover": item.onClick
                          ? {
                              transform: "translateX(2px)",
                              backgroundColor: theme.palette.action.selected,
                            }
                          : undefined,
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={1.25} minWidth={0}>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 2,
                              display: "grid",
                              placeItems: "center",
                              color: colors.fg,
                              backgroundColor: colors.bg,
                              flexShrink: 0,
                            }}
                          >
                            {item.icon ?? defaultIcon(item.severity)}
                          </Box>

                          <Box minWidth={0}>
                            <Typography variant="body2" fontWeight={600} noWrap>
                              {item.label}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.severity === "error"
                                ? "Immediate review"
                                : item.severity === "warning"
                                ? "Monitor closely"
                                : item.severity === "info"
                                ? "Informational"
                                : "Data visibility issue"}
                            </Typography>
                          </Box>
                        </Stack>

                        <Chip
                          label={item.count}
                          color={
                            item.severity === "error"
                              ? "error"
                              : item.severity === "warning"
                              ? "warning"
                              : item.severity === "info"
                              ? "info"
                              : "default"
                          }
                          sx={{ minWidth: 44, fontWeight: 700 }}
                        />
                      </Stack>
                    </Box>

                    {index < activeItems.length - 1 && <Box sx={{ height: 2 }} />}
                  </Box>
                );
              })}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};