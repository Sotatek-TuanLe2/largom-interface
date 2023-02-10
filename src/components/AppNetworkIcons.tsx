import { Box, Flex } from '@chakra-ui/react';
import { getNetworkConfig } from 'src/utils/network';
import 'src/styles/components/AppNetworkIcons.scss';

interface IAppNetworkIconsProps {
  networkIds: string[];
  showNumber?: number;
  className?: string;
}

const AppNetworkIcons: React.FC<IAppNetworkIconsProps> = (props) => {
  const { networkIds, showNumber, className = '' } = props;

  const showNetworks = [...networkIds];
  if (showNumber && networkIds.length > showNumber) {
    showNetworks.length = showNumber;
  }

  const getNetworkIcon = (networkId: string) => {
    const networkConfig = getNetworkConfig(networkId);
    if (!networkConfig) {
      return null;
    }
    return (
      <img
        className="network-image"
        src={networkConfig.iconURL}
        alt={`${networkId} icon`}
      />
    );
  };

  return (
    <Flex alignItems="center" className={`network-icons ${className}`}>
      {showNetworks.map((network) => (
        <Box key={network} className="network-icons__item">
          {getNetworkIcon(network)}
        </Box>
      ))}
    </Flex>
  );
};

export default AppNetworkIcons;
