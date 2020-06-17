import React from 'react'

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: "#9F3037"
  },

  icon: {
    marginLeft: 50
  },

  grow: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(0.5),
  },

  title: {
    display: 'none',
    marginLeft: 8,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontFamily: 'fontawesome',
    
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1.0),
    '&:hover': {
    backgroundColor: fade(theme.palette.common.white, 1.0),
    },
    
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '45%',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'darkgrey'
  },
  inputRoot: {
    color: 'grey',
  },
  ShoppingCartRoundedIcon: {
    marginRight: theme.spacing(0.5),
},
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 7,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

function Headerbar() {
  const classes = useStyles();
  return (
    <div className={classes.grow} >
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap> 
          <Link to= '/' style={{ textDecoration: 'none', color: 'white' }}>
          &#xf02d; Bookstore
          </Link>
        </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
              <Typography variant="h6" style={{fontFamily: 'fontawesome', paddingRight: 50}}>
                <Link to= '/WishList' style={{ textDecoration: 'none', color: 'white'}}>
                <StyledBadge badgeContent={2} color="secondary">
                  WhishList &#xf004;
                </StyledBadge>
                </Link>
              </Typography>
          <Typography variant="h6"  style={{fontFamily: 'fontawesome', paddingRight: 20}}>
          <Link to= '/Cart' style={{ textDecoration: 'none', color: 'white' }}>
          <StyledBadge badgeContent={1} color="secondary">
             Cart &#xf217;
          </StyledBadge>
          </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}



export default Headerbar
