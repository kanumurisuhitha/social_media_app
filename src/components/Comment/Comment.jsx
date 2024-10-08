import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
const formatDate = (timestamp) => {
  if (!timestamp) return "";
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

const Comment = ({ comment }) => {
  const { isLoading, userProfile } = useGetUserProfileById(comment?.createdBy);
  if (isLoading) return <CommentSkeleton />;
  return (
    <Flex gap={4}>
      <Link to={`/${userProfile?.userName}`}>
        <Avatar
          src={userProfile?.profilePicURL}
          name={userProfile?.userName}
          size={"sm"}
        />
      </Link>
      <Flex direction="column">
        <Flex gap={2}>
          <Link to={`/${userProfile?.userName}`}>
            <Text fontWeight={"bold"} fontSize={12}>
              {userProfile?.userName}
            </Text>
          </Link>
          <Text fontSize={14}>{comment?.comment}</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {formatDate(comment?.createdOn)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Comment;
const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={10} w="10" />
      <Flex gap={1} flexDir={"column"}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};
