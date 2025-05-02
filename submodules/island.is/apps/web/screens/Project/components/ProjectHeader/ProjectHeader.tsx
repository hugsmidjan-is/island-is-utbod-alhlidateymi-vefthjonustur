import { ResponsiveSpace } from '@island.is/island-ui/core'
import {
  DefaultHeader,
  DefaultHeaderProps,
  DefaultProjectHeader,
  DirectorateOfHealthDashboardHeader,
  EntryProjectHeader,
  FiskistofaDashboardHeader,
  GrindavikProjectHeader,
  UkraineProjectHeader,
} from '@island.is/web/components'
import { ProjectPage as ProjectPageSchema } from '@island.is/web/graphql/schema'
import { getBackgroundStyle } from '@island.is/web/utils/organization'

interface ProjectHeaderProps {
  projectPage: ProjectPageSchema
  isSubpage?: boolean
}

export const ProjectHeader = ({
  projectPage,
  isSubpage,
}: ProjectHeaderProps) => {
  switch (projectPage.theme) {
    case 'traveling-to-iceland':
      return <EntryProjectHeader projectPage={projectPage} />
    case 'ukraine':
      return <UkraineProjectHeader projectPage={projectPage} />
    case 'opinbernyskopun':
      return (
        <DefaultProjectHeader
          projectPage={projectPage}
          headerImageObjectFit="contain"
        />
      )
    case 'gagnasidur-fiskistofu':
      return <FiskistofaDashboardHeader projectPage={projectPage} />
    case 'directorate-of-health':
      return <DirectorateOfHealthDashboardHeader projectPage={projectPage} />
    case 'grindavik':
      return <GrindavikProjectHeader projectPage={projectPage} />
    case 'default-v2':
      return (
        <DefaultHeader
          title={projectPage.title}
          background={
            projectPage.defaultHeaderBackgroundColor ||
            getBackgroundStyle(projectPage.themeProperties)
          }
          titleColor={
            (projectPage.themeProperties
              ?.textColor as DefaultHeaderProps['titleColor']) || 'dark400'
          }
          fullWidth={projectPage.themeProperties?.fullWidth ?? false}
          image={projectPage.defaultHeaderImage?.url}
          imageIsFullHeight={
            projectPage.themeProperties?.imageIsFullHeight ?? true
          }
          imagePadding={projectPage.themeProperties?.imagePadding || '20px'}
          imageObjectFit={
            projectPage.themeProperties?.imageObjectFit === 'cover'
              ? 'cover'
              : 'contain'
          }
          imageObjectPosition={
            projectPage.themeProperties?.imageObjectPosition === 'left'
              ? 'left'
              : projectPage.themeProperties?.imageObjectPosition === 'right'
              ? 'right'
              : 'center'
          }
          titleSectionPaddingLeft={
            projectPage.themeProperties
              ?.titleSectionPaddingLeft as ResponsiveSpace
          }
          mobileBackground={projectPage.themeProperties?.mobileBackgroundColor}
          isSubpage={isSubpage}
        />
      )
    default: {
      let objectFit: 'cover' | 'contain' =
        projectPage.themeProperties?.imageObjectFit === 'cover'
          ? 'cover'
          : 'contain'

      // Default should be 'cover' if nothing is defined
      if (!projectPage.themeProperties?.imageObjectFit) {
        objectFit = 'cover'
      }

      return (
        <DefaultProjectHeader
          projectPage={projectPage}
          headerImageObjectFit={objectFit}
        />
      )
    }
  }
}

export default ProjectHeader
