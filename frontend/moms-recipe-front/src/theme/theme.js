import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// src/theme/theme.js
// A simple, slightly warm/handcrafted theme tailored for card-based apps using MUI v5.


const rawTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6B4C3B', // warm brown
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#F6AE2D', // mustard accent
            contrastText: '#1f1f1f',
        },
        info: {
            main: '#6EB5A6',
        },
        success: {
            main: '#88C057',
        },
        background: {
            default: '#FBF7F2', // soft ivory
            paper: '#FFFDF8',
        },
        text: {
            primary: '#3b2f2a', // deep coffee
            secondary: '#6b5a51',
        },
        divider: 'rgba(88,68,59,0.12)',
    },

    shape: {
        borderRadius: 12,
    },

    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontFamily: '"Merriweather", serif', fontWeight: 700 },
        h2: { fontFamily: '"Merriweather", serif', fontWeight: 700 },
        h3: { fontFamily: '"Merriweather", serif', fontWeight: 700 },
        button: { textTransform: 'none', fontWeight: 600 },
        body1: { lineHeight: 1.45 },
    },

    // custom-ish card shadow palette for a handmade elevated look
    shadows: [
        'none',
        '0px 6px 18px rgba(99,72,61,0.08), inset 0 -1px 0 rgba(255,255,255,0.4)',
        '0px 8px 24px rgba(99,72,61,0.10), inset 0 -1px 0 rgba(255,255,255,0.36)',
        '0px 12px 36px rgba(99,72,61,0.12)',
        // fallback for the rest
        ...Array(21).fill('0px 10px 30px rgba(99,72,61,0.08)'),
    ],
});

const theme = createTheme(rawTheme, {
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background:
                        'radial-gradient(circle at 10% 10%, rgba(246,174,45,0.03), transparent 8%), linear-gradient(180deg, rgba(0,0,0,0.01), transparent 40%)',
                    backgroundColor: rawTheme.palette.background.default,
                    WebkitFontSmoothing: 'antialiased',
                },
            },
        },

        MuiCard: {
            defaultProps: {
                elevation: 1,
            },
            styleOverrides: {
                root: {
                    background: rawTheme.palette.background.paper,
                    border: `1px solid ${rawTheme.palette.divider}`,
                    borderRadius: rawTheme.shape.borderRadius,
                    boxShadow: rawTheme.shadows[1],
                    overflow: 'visible',
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    background: rawTheme.palette.background.paper,
                },
            },
        },

        MuiCardHeader: {
            styleOverrides: {
                root: {
                    padding: '16px 16px 8px 16px',
                },
                title: {
                    color: rawTheme.palette.text.primary,
                    fontWeight: 700,
                },
                subheader: {
                    color: rawTheme.palette.text.secondary,
                },
            },
        },

        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '8px 16px 16px 16px',
                },
            },
        },

        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 9999,
                    padding: '8px 14px',
                    letterSpacing: 0.2,
                },
                containedPrimary: {
                    background: `linear-gradient(180deg, ${rawTheme.palette.primary.main}, ${rawTheme.palette.primary.dark || '#52372b'})`,
                    color: rawTheme.palette.primary.contrastText,
                    boxShadow: '0 6px 18px rgba(107,76,59,0.12)',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 10px 26px rgba(107,76,59,0.14)',
                    },
                },
                outlined: {
                    borderColor: rawTheme.palette.divider,
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    border: `1px solid ${rawTheme.palette.divider}`,
                },
            },
        },

        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundImage:
                        'linear-gradient(90deg, transparent, rgba(88,68,59,0.08) 30%, rgba(88,68,59,0.08) 70%, transparent)',
                },
            },
        },
    },
});

export default responsiveFontSizes(theme);