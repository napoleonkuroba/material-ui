import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, {
  TreeItemProps,
  useTreeItem,
  TreeItemContentProps,
} from '@mui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';

const CustomContentRoot = styled('div')(({ theme }) => ({
  WebkitTapHighlightColor: 'transparent',
  '&:hover, &.Mui-disabled, &.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused, &.Mui-selected:hover':
    {
      backgroundColor: 'transparent',
    },
  [`& .MuiTreeItem-contentBar`]: {
    position: 'absolute',
    width: '100%',
    height: 24,
    left: 0,
    '&:hover &': {
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-disabled &': {
      opacity: theme.palette.action.disabledOpacity,
      backgroundColor: 'transparent',
    },
    '&.Mui-focused &': {
      backgroundColor: theme.palette.action.focus,
    },
    '&.Mui-selected &': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity,
      ),
    },
    '&.Mui-selected:hover &': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
      ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    '&.Mui-selected.Mui-focused &': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
      ),
    },
  },
}));

const CustomContent = React.forwardRef(function CustomContent(
  props: TreeItemContentProps,
  ref,
) {
  const {
    className,
    classes,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleExpansion(event);
    handleSelection(event);
  };

  return (
    <CustomContentRoot
      className={clsx(className, classes.root, {
        'Mui-expanded': expanded,
        'Mui-selected': selected,
        'Mui-focused': focused,
        'Mui-disabled': disabled,
      })}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      <div className="MuiTreeItem-contentBar" />
      <div className={classes.iconContainer}>{icon}</div>
      <Typography component="div" className={classes.label}>
        {label}
      </Typography>
    </CustomContentRoot>
  );
});

const CustomTreeItem = (props: TreeItemProps) => (
  <TreeItem ContentComponent={CustomContent} {...props} />
);

export default function BarTreeView() {
  return (
    <TreeView
      aria-label="icon expansion"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, position: 'relative' }}
    >
      <CustomTreeItem nodeId="1" label="Applications">
        <CustomTreeItem nodeId="2" label="Calendar" />
        <CustomTreeItem nodeId="3" label="Chrome" />
        <CustomTreeItem nodeId="4" label="Webstorm" />
      </CustomTreeItem>
      <CustomTreeItem nodeId="5" label="Documents">
        <CustomTreeItem nodeId="10" label="OSS" />
        <CustomTreeItem nodeId="6" label="Material-UI">
          <CustomTreeItem nodeId="7" label="src">
            <CustomTreeItem nodeId="8" label="index.js" />
            <CustomTreeItem nodeId="9" label="tree-view.js" />
          </CustomTreeItem>
        </CustomTreeItem>
      </CustomTreeItem>
    </TreeView>
  );
}
